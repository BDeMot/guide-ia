// Archives every reference of the corpus as Markdown in sources/<author>/,
// so the texts survive if the original pages disappear. Personal copy:
// sources/ is git-ignored and must never be published.
//
// Usage: npm run archive [-- --force] [-- <url fragment>]
//   --force          re-download references already archived
//   <url fragment>   only archive the references whose URL contains it

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Readability } from '@mozilla/readability'
import { JSDOM, VirtualConsole } from 'jsdom'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'
import { extractText, getDocumentProxy } from 'unpdf'
import { stringify } from 'yaml'
import { chapterFiles, normalizeUrl, parseEntry } from './lib/corpus.mjs'

const ARCHIVE_DIR = 'sources'
const MANIFEST = join(ARCHIVE_DIR, 'manifest.json')
const INDEX = join(ARCHIVE_DIR, 'README.md')
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
const CONCURRENCY = 5
// Below this length, the text may be a short post or a mere landing page: status "court", to check by hand.
const MIN_COMPLETE_LENGTH = 3000
const PAYWALL = /(this post is for paid subscribers|subscribe for free to continue reading|subscribe to continue reading|keep reading with a 7-day free trial|member-only story)/i

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const FRENCH_DATE = new RegExp(`(?:(\\d{1,2})(?:er)? )?(${MONTHS.join('|')}) (\\d{4})`)
const BYLINE = new RegExp(`^(.{2,160}?), (?:\\d|${MONTHS.join('|')}|discussion)`)

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' })
turndown.use(gfm)

// --- Corpus ---------------------------------------------------------------

function corpusReferences() {
  const references = new Map()
  for (const path of chapterFiles()) {
    const chapter = Number(path.split('/').pop().slice(0, 2))
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const entry = parseEntry(line)
      if (!entry) continue
      const url = normalizeUrl(entry.url)
      if (references.has(url)) {
        references.get(url).chapters.push(chapter)
        continue
      }
      const title = line.match(/\*\* \[([^\]]+)\]\(/)?.[1] ?? url
      const description = line.split(') — ').slice(1).join(') — ')
      references.set(url, { url: entry.url, title, site: entry.site, chapters: [chapter], ...byline(description, entry.site) })
    }
  }
  return [...references.values()]
}

// "Interview de Kent Beck par Gergely Orosz, 11 juin 2025." → Kent Beck, the voice being cited.
function byline(description, site) {
  const match = description.match(BYLINE)
  const date = frenchDate(description.slice(0, (match?.[0].length ?? 0) + 30))
  if (!match) return { authors: [site], date }
  const names = match[1]
    .replace(/\([^)]*\)/g, '')
    .replace(/^Interview de /, '')
    .split(/,| et | par | avec /)
    .map(name => name.trim())
    .filter(name => name && name !== 'al.' && !/^\d+ auteurs/.test(name))
  return { authors: names.length ? names : [site], date }
}

function frenchDate(text) {
  const match = text.match(FRENCH_DATE)
  // Older references only give a year: "Lisanne Bainbridge, 1983 (Automatica…)".
  if (!match) return text.match(/, ((?:19|20)\d{2})\b/)?.[1] ?? null
  const month = String(MONTHS.indexOf(match[2]) + 1).padStart(2, '0')
  return match[1] ? `${match[3]}-${month}-${match[1].padStart(2, '0')}` : `${match[3]}-${month}`
}

// --- Fetching -------------------------------------------------------------

async function get(url, accept = 'text/html,application/xhtml+xml,*/*') {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: accept, 'Accept-Language': 'en,fr;q=0.8' },
    redirect: 'follow',
    signal: AbortSignal.timeout(45_000),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status} pour ${url}`)
  return response
}

function htmlToArticle(html, url) {
  const dom = new JSDOM(html, { url, virtualConsole: new VirtualConsole() })
  const doc = dom.window.document
  const meta = name => doc.querySelector(`meta[property="${name}"], meta[name="${name}"]`)?.getAttribute('content')
  const published = meta('article:published_time') ?? meta('date') ?? doc.querySelector('time[datetime]')?.getAttribute('datetime')
  const article = new Readability(doc).parse()
  if (!article?.content) throw new Error('aucun contenu extrait')
  return {
    title: article.title,
    markdown: turndown.turndown(article.content),
    published: published?.slice(0, 10) ?? null,
  }
}

async function fetchHtmlArticle(url) {
  const response = await get(url)
  const type = response.headers.get('content-type') ?? ''
  if (type.includes('pdf')) {
    const pdf = Buffer.from(await response.arrayBuffer())
    return { markdown: await pdfText(pdf), pdf, note: 'PDF : texte extrait automatiquement (mise en page perdue, colonnes et notes possiblement mêlées) ; le PDF original est à côté.' }
  }
  const html = await response.text()
  const article = htmlToArticle(html, response.url)
  if (!html.includes('substackcdn.com')) return article
  const { paywalled, transcript } = await substackExtras(response.url)
  if (paywalled) return { ...article, complete: false, note: 'Texte réservé aux abonnés : seul le début est archivé.' }
  if (transcript) return { ...article, markdown: `${article.markdown}\n\n## Transcription de l'épisode\n\n${transcript}`, note: 'Épisode de podcast : transcription automatique Substack.' }
  return article
}

async function pdfText(buffer) {
  const document = await getDocumentProxy(new Uint8Array(buffer))
  const { text } = await extractText(document, { mergePages: false })
  return text.map((page, i) => `## Page ${i + 1}\n\n${page.trim()}`).join('\n\n')
}

// arXiv: the HTML rendering gives the full text; the PDF is kept alongside.
async function fetchArxiv(url) {
  const id = url.match(/arxiv\.org\/abs\/([^/?#]+)/)[1]
  const pdf = Buffer.from(await (await get(`https://arxiv.org/pdf/${id}`, 'application/pdf')).arrayBuffer())
  try {
    return { ...await fetchHtmlArticle(`https://arxiv.org/html/${id}`), pdf }
  } catch {
    return { ...await fetchHtmlArticle(url), pdf, note: 'Version HTML indisponible : seul le résumé est en Markdown, le texte intégral est dans le PDF.' }
  }
}

async function fetchGithub(url) {
  const [, owner, repo] = new URL(url).pathname.split('/')
  for (const name of ['README.md', 'readme.md', 'README.markdown']) {
    try {
      const markdown = await (await get(`https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${name}`, 'text/plain')).text()
      return { markdown, note: `Fichier ${name} du dépôt ${owner}/${repo}.` }
    } catch {}
  }
  throw new Error('README introuvable')
}

async function fetchTweet(url) {
  const [, user, , id] = new URL(url).pathname.split('/')
  const { tweet } = await (await get(`https://api.fxtwitter.com/${user}/status/${id}`, 'application/json')).json()
  const article = tweet.article?.content?.blocks?.map(block => block.text).join('\n\n')
  return {
    markdown: article ?? tweet.raw_text?.text ?? tweet.text,
    published: tweet.created_timestamp ? new Date(tweet.created_timestamp * 1000).toISOString().slice(0, 10) : null,
    complete: true,
    note: 'Texte récupéré via api.fxtwitter.com (x.com exige JavaScript).',
  }
}

// YouTube: description and, when available, the caption track as transcript.
async function fetchYoutube(url) {
  const html = await (await get(url)).text()
  const json = html.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\});(?:var|<\/script>)/s)?.[1]
  if (!json) throw new Error('page YouTube illisible')
  const player = JSON.parse(json)
  const details = player.videoDetails ?? {}
  const published = player.microformat?.playerMicroformatRenderer?.publishDate?.slice(0, 10) ?? null
  const transcript = await youtubeTranscript(details.videoId).catch(() => null)
  const parts = [`**Chaîne :** ${details.author ?? '?'}`, '## Description', details.shortDescription ?? '']
  if (transcript) parts.push('## Transcription (sous-titres YouTube)', transcript)
  return {
    title: details.title,
    markdown: parts.join('\n\n'),
    published,
    complete: Boolean(transcript),
    note: transcript ? 'Vidéo : transcription issue des sous-titres YouTube.' : 'Vidéo : seule la description a pu être archivée (pas de transcription accessible).',
  }
}

// The web player's caption URLs need a token; the Android client's do not.
const ANDROID_CLIENT = { clientName: 'ANDROID', clientVersion: '20.10.38', androidSdkVersion: 34, hl: 'en' }
const ANDROID_AGENT = 'com.google.android.youtube/20.10.38 (Linux; U; Android 14)'

async function youtubeTranscript(videoId) {
  const response = await fetch('https://www.youtube.com/youtubei/v1/player', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': ANDROID_AGENT },
    body: JSON.stringify({ videoId, context: { client: ANDROID_CLIENT } }),
    signal: AbortSignal.timeout(45_000),
  })
  const tracks = (await response.json()).captions?.playerCaptionsTracklistRenderer?.captionTracks ?? []
  const track = tracks.find(t => t.languageCode?.startsWith('en') && t.kind !== 'asr') ?? tracks.find(t => t.languageCode?.startsWith('en')) ?? tracks[0]
  if (!track) return null
  const xml = await (await fetch(track.baseUrl, { headers: { 'User-Agent': ANDROID_AGENT } })).text()
  const { document } = new JSDOM(xml, { contentType: 'text/xml' }).window
  const cues = [...document.querySelectorAll('p')].map(p => p.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean)
  return paragraphs(cues, 12)
}

function paragraphs(sentences, size) {
  const result = []
  for (let i = 0; i < sentences.length; i += size) result.push(sentences.slice(i, i + size).join(' '))
  return result.join('\n\n') || null
}

// Substack: the post API tells whether the text is paywalled, and holds the
// podcast transcript that the page loads with JavaScript.
async function substackExtras(pageUrl) {
  const { origin, pathname } = new URL(pageUrl)
  const slug = pathname.match(/^\/p\/([^/]+)/)?.[1]
  if (!slug) return {}
  const post = await (await get(`${origin}/api/v1/posts/${slug}`, 'application/json')).json()
  const upload = post.podcastUpload ?? post.videoUpload
  let transcript = null
  if (upload?.transcription?.cdn_url) {
    const segments = await (await get(upload.transcription.cdn_url, 'application/json')).json()
    transcript = speakerTurns(segments)
  }
  return { paywalled: post.audience && post.audience !== 'everyone', transcript }
}

function speakerTurns(segments) {
  const turns = []
  for (const segment of segments) {
    const speaker = segment.words?.find(w => w.speaker)?.speaker ?? turns.at(-1)?.speaker
    const text = segment.text.trim()
    if (turns.at(-1)?.speaker === speaker) turns.at(-1).text += ` ${text}`
    else turns.push({ speaker, text })
  }
  return turns.map(t => `**${t.speaker ?? '?'} :** ${t.text}`).join('\n\n')
}

function fetcherFor(url) {
  const host = new URL(url).hostname
  if (host === 'arxiv.org') return fetchArxiv
  if (host === 'github.com') return fetchGithub
  if (host === 'x.com' || host === 'twitter.com') return fetchTweet
  if (host.endsWith('youtube.com') || host === 'youtu.be') return fetchYoutube
  return fetchHtmlArticle
}

// --- Writing --------------------------------------------------------------

function slug(text, max = 80) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, max).replace(/-$/, '')
}

function folderName(author) {
  return author.replace(/[/:]/g, '-').trim()
}

async function archive(reference) {
  const result = await fetcherFor(reference.url)(reference.url)
  const date = reference.date ?? result.published ?? null
  const dir = join(ARCHIVE_DIR, folderName(reference.authors[0]))
  const base = [date, slug(reference.title)].filter(Boolean).join('-')
  mkdirSync(dir, { recursive: true })

  const text = result.markdown?.trim() ?? ''
  const status = result.pdf || result.complete === true ? 'complet'
    : result.complete === false || PAYWALL.test(text) ? 'partiel'
    : text.length < MIN_COMPLETE_LENGTH ? 'court' : 'complet'
  const frontmatter = {
    title: reference.title,
    authors: reference.authors,
    site: reference.site,
    url: reference.url,
    date,
    chapters: reference.chapters,
    archived: new Date().toISOString().slice(0, 10),
    status,
    ...(result.pdf && { pdf: `${base}.pdf` }),
    ...(result.note && { note: result.note }),
  }
  if (result.pdf) writeFileSync(join(dir, `${base}.pdf`), result.pdf)
  const path = join(dir, `${base}.md`)
  writeFileSync(path, `---\n${stringify(frontmatter)}---\n\n# ${reference.title}\n\n> Source : <${reference.url}>\n\n${text}\n`)
  return { path, status, length: text.length }
}

function writeIndex(references, manifest) {
  const byAuthor = new Map()
  for (const reference of references) {
    const author = reference.authors[0]
    if (!byAuthor.has(author)) byAuthor.set(author, [])
    byAuthor.get(author).push(reference)
  }
  const counts = Object.values(manifest).reduce((acc, { status }) => ({ ...acc, [status]: (acc[status] ?? 0) + 1 }), {})
  const lines = [
    '# Archive des références du guide',
    '',
    'Copie personnelle des articles cités dans le corpus, générée par `npm run archive`. Ne pas publier : ces textes appartiennent à leurs auteurs.',
    '',
    `${references.length} références : ${Object.entries(counts).map(([s, n]) => `${n} ${s}`).join(', ')}.`,
    '',
  ]
  for (const author of [...byAuthor.keys()].sort((a, b) => a.localeCompare(b, 'fr'))) {
    lines.push(`## ${author}`, '')
    for (const reference of byAuthor.get(author)) {
      const entry = manifest[normalizeUrl(reference.url)]
      const link = entry?.path ? `[${reference.title}](${encodeURI(entry.path.slice(ARCHIVE_DIR.length + 1))})` : reference.title
      const flag = entry?.status === 'complet' ? '' : ` — **${entry?.status ?? 'non archivé'}**${entry?.error ? ` (${entry.error})` : ''}`
      lines.push(`- ${link} — [original](${reference.url})${flag}`)
    }
    lines.push('')
  }
  writeFileSync(INDEX, lines.join('\n'))
}

// --- Main -----------------------------------------------------------------

const args = process.argv.slice(2)
const force = args.includes('--force')
const filter = args.find(arg => !arg.startsWith('--'))

mkdirSync(ARCHIVE_DIR, { recursive: true })
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {}
const references = corpusReferences()
const todo = references.filter(r => {
  if (filter && !r.url.includes(filter)) return false
  const entry = manifest[normalizeUrl(r.url)]
  return force || filter || !entry || entry.status === 'échec' || !existsSync(entry.path)
})

console.log(`${references.length} références, ${todo.length} à archiver.`)
const queue = [...todo]
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  for (let reference; (reference = queue.shift());) {
    const key = normalizeUrl(reference.url)
    const previous = manifest[key]?.path
    try {
      const { path, status, length } = await archive(reference)
      if (previous && previous !== path) {
        for (const old of [previous, previous.replace(/\.md$/, '.pdf')]) if (existsSync(old)) rmSync(old)
      }
      manifest[key] = { path, status }
      console.log(`${status === 'complet' ? '✓' : '~'} ${path} (${length} car.)`)
    } catch (error) {
      manifest[key] = { status: 'échec', error: error.message }
      console.log(`✗ ${reference.url} : ${error.message}`)
    }
  }
}))

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
writeIndex(references, manifest)
const failed = Object.values(manifest).filter(e => e.status !== 'complet').length
console.log(`Terminé. ${failed} référence(s) courte(s), partielle(s) ou en échec, voir ${INDEX}.`)
