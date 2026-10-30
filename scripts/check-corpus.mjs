// Consistency checks for the corpus in content/.
//
// - each reference URL appears only once across chapters;
// - the total announced in content/1.presentation.md matches the real count;
// - each chapter has a synthesis page, and links to it;
// - each synthesis declares its status and only cites references of its chapter.
//
// Usage: node scripts/check-corpus.mjs
// Exits with code 1 when an error is found.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const CONTENT_DIR = 'content'
const SYNTHESES_DIR = join(CONTENT_DIR, '7.syntheses')
const PRESENTATION = join(CONTENT_DIR, '1.presentation.md')

// Canonical label: **Central · Site**. Nuxt Studio may rewrite it as
// **[Central · Site]** or [**Central · Site**]; both are accepted.
const ENTRY = /^- (?:\*\*\[|\[\*\*|\*\*)(Central|Complémentaire) · ([^\]*]+)(?:\]\*\*|\*\*\]|\*\*) \[[^\]]+\]\((https?:\/\/[^)\s]+)\)/gm
const ANY_ENTRY = /^- (?:\*\*\[|\[\*\*|\*\*)(?:Central|Complémentaire) · /gm
const EXTERNAL_LINK = /\]\((https?:\/\/[^)\s]+)\)/g
const CHAPTER_FILE = /^(\d{2})\.(.+)\.md$/

const errors = []

function listFiles(dir) {
  return readdirSync(dir).map(name => join(dir, name))
}

function chapterFiles() {
  return listFiles(CONTENT_DIR)
    .filter(path => statSync(path).isDirectory() && /\/\d\.partie-/.test(path))
    .flatMap(listFiles)
    .filter(path => CHAPTER_FILE.test(path.split('/').pop()))
}

function parseChapter(path) {
  const [, number, slug] = path.split('/').pop().match(CHAPTER_FILE)
  const text = readFileSync(path, 'utf8')
  const entries = [...text.matchAll(ENTRY)].map(([, weight, site, url]) => ({ weight, site, url }))
  const unparsed = (text.match(ANY_ENTRY) ?? []).length - entries.length
  if (unparsed > 0) errors.push(`${path} : ${unparsed} référence(s) au format non reconnu`)
  return { path, number, slug, text, entries }
}

function checkDuplicates(chapters) {
  const seen = new Map()
  for (const chapter of chapters) {
    for (const { url } of chapter.entries) {
      if (seen.has(url)) errors.push(`URL en double : ${url} (chapitres ${seen.get(url)} et ${chapter.number})`)
      else seen.set(url, chapter.number)
    }
  }
}

function checkPresentationTotal(total) {
  const announced = readFileSync(PRESENTATION, 'utf8').match(/\*\*Corpus :\*\* (\d+) références/)
  if (!announced) errors.push(`${PRESENTATION} : total « **Corpus :** N références » introuvable`)
  else if (Number(announced[1]) !== total) {
    errors.push(`${PRESENTATION} annonce ${announced[1]} références, le corpus en contient ${total}`)
  }
}

function checkSyntheses(chapters) {
  const syntheses = new Map(
    listFiles(SYNTHESES_DIR)
      .filter(path => CHAPTER_FILE.test(path.split('/').pop()))
      .map(path => [path.split('/').pop().match(CHAPTER_FILE)[1], path]),
  )

  for (const chapter of chapters) {
    const path = syntheses.get(chapter.number)
    if (!path) {
      errors.push(`Chapitre ${chapter.number} : pas de synthèse dans ${SYNTHESES_DIR}`)
      continue
    }
    if (!path.endsWith(`${chapter.number}.${chapter.slug}.md`)) {
      errors.push(`${path} : le nom doit reprendre celui du chapitre (${chapter.number}.${chapter.slug}.md)`)
    }
    if (!chapter.text.includes(`/syntheses/${chapter.slug}`)) {
      errors.push(`${chapter.path} : pas de lien vers /syntheses/${chapter.slug}`)
    }

    const text = readFileSync(path, 'utf8')
    if (!/^\s+statut: (non relue|relue)$/m.test(text)) {
      errors.push(`${path} : « statut: non relue » ou « statut: relue » manquant dans le frontmatter`)
    }
    const chapterUrls = new Set(chapter.entries.map(entry => entry.url))
    for (const [, url] of text.matchAll(EXTERNAL_LINK)) {
      if (!chapterUrls.has(url)) errors.push(`${path} : ${url} n'est pas une référence du chapitre ${chapter.number}`)
    }
  }
}

const chapters = chapterFiles().map(parseChapter).sort((a, b) => a.number.localeCompare(b.number))
const total = chapters.reduce((sum, chapter) => sum + chapter.entries.length, 0)

if (chapters.length !== 17) errors.push(`${chapters.length} chapitres trouvés au lieu de 17`)
checkDuplicates(chapters)
checkPresentationTotal(total)
checkSyntheses(chapters)

const bySite = {}
for (const { site } of chapters.flatMap(chapter => chapter.entries)) bySite[site] = (bySite[site] ?? 0) + 1
console.log(`${total} références dans ${chapters.length} chapitres`)
for (const [site, count] of Object.entries(bySite).sort((a, b) => b[1] - a[1])) console.log(`  ${site} : ${count}`)

if (errors.length) {
  console.error(`\n${errors.length} erreur(s) :`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}
console.log('\nCorpus cohérent.')
