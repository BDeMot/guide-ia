// Watch feeds listed in veille/sources.yml.
//
// Usage:
//   node scripts/feeds.mjs check
//       Fetch every feed and report its status, item count and latest date.
//   node scripts/feeds.mjs list [name] [--since YYYY-MM-DD]
//       List feed items newer than the source's derniere_veille (or --since,
//       or 2025-01-01 for a source never watched), skipping URLs already in
//       the corpus, rejected, or queued in veille/a-consulter.yml.
//       [name] filters sources whose nom contains it (case-insensitive).

import {
  REJECTED, SOURCES, TO_CONSULT, corpusUrls, normalizeUrl, readYaml,
} from './lib/corpus.mjs'

// Some feeds (Bear Blog, Medium) refuse requests without a browser user agent.
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
const FIRST_WATCH = '2025-01-01'
const TIMEOUT_MS = 20000

function feedsOf(source) {
  const feeds = Array.isArray(source.flux) ? source.flux : [source.flux]
  return feeds.filter(feed => typeof feed === 'string' && feed.startsWith('http'))
}

function decode(text = '') {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim()
}

function tag(block, name) {
  return block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'))?.[1]
}

function link(block) {
  const atom = block.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/i)
    ?? block.match(/<link[^>]*href="([^"]+)"/i)
  return decode(atom?.[1] ?? tag(block, 'link'))
}

function parseItems(xml) {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) ?? []
  return blocks.map(block => {
    const raw = tag(block, 'pubDate') ?? tag(block, 'published') ?? tag(block, 'updated') ?? tag(block, 'dc:date')
    const date = raw ? new Date(decode(raw)) : null
    return {
      title: decode(tag(block, 'title')).replace(/\s+/g, ' '),
      url: link(block),
      date: date && !Number.isNaN(date.getTime()) ? date.toISOString().slice(0, 10) : '?',
    }
  })
}

async function fetchFeed(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/rss+xml, application/atom+xml, text/xml, */*' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const items = parseItems(await response.text())
  if (!items.length) throw new Error('aucun élément RSS ou Atom')
  return items
}

async function check(sources) {
  let broken = 0
  for (const source of sources) {
    const feeds = feedsOf(source)
    if (!feeds.length) {
      console.log(`○ ${source.nom} : flux ${source.flux ?? 'absent'} (consultation manuelle)`)
      continue
    }
    for (const feed of feeds) {
      try {
        const items = await fetchFeed(feed)
        const latest = items.map(item => item.date).filter(date => date !== '?').sort().pop() ?? '?'
        console.log(`✓ ${source.nom} : ${items.length} éléments, dernier le ${latest} — ${feed}`)
      }
      catch (error) {
        broken++
        console.log(`✗ ${source.nom} : ${error.message} — ${feed}`)
      }
    }
  }
  if (broken) {
    console.error(`\n${broken} flux en erreur.`)
    process.exit(1)
  }
}

async function list(sources, since) {
  const known = corpusUrls()
  const rejected = new Set(readYaml(REJECTED, 'ecartees').map(item => normalizeUrl(item.url)))
  const queued = new Set(readYaml(TO_CONSULT, 'publications').map(item => normalizeUrl(item.url)))

  for (const source of sources) {
    const from = since ?? source.derniere_veille ?? FIRST_WATCH
    const feeds = feedsOf(source)
    console.log(`\n## ${source.nom} (depuis ${from})`)
    if (!feeds.length) {
      console.log(`Consultation manuelle : ${source.archive ?? source.site}`)
      continue
    }
    for (const feed of feeds) {
      try {
        const items = (await fetchFeed(feed)).filter(item => item.date === '?' || item.date >= String(from))
        const fresh = items.filter(item => {
          const url = normalizeUrl(item.url)
          return !known.has(url) && !rejected.has(url)
        })
        for (const item of fresh) {
          const mark = queued.has(normalizeUrl(item.url)) ? ' [déjà en file]' : ''
          console.log(`- ${item.date} · ${item.title} — ${item.url}${mark}`)
        }
        const skipped = items.length - fresh.length
        if (!fresh.length) console.log(`Rien de nouveau dans ${feed}`)
        if (skipped) console.log(`(${skipped} déjà dans le corpus ou écartés)`)
      }
      catch (error) {
        console.log(`✗ ${error.message} — ${feed}`)
      }
    }
  }
  const archives = sources.filter(source => source.archive && feedsOf(source).length)
  if (archives.length) {
    console.log('\nLes flux peuvent être incomplets ; consulter aussi :')
    for (const source of archives) console.log(`- ${source.nom} : ${source.archive}`)
  }
}

const [command, ...args] = process.argv.slice(2)
const sinceIndex = args.indexOf('--since')
const since = sinceIndex >= 0 ? args.splice(sinceIndex, 2)[1] : undefined
const filter = args[0]?.toLowerCase()
const sources = readYaml(SOURCES, 'sources')
  .filter(source => !filter || source.nom.toLowerCase().includes(filter))

if (command === 'check') await check(sources)
else if (command === 'list') await list(sources, since)
else {
  console.error('Usage : node scripts/feeds.mjs check | list [nom] [--since AAAA-MM-JJ]')
  process.exit(1)
}
