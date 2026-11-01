// Insert proposed references under their chapter and refresh the corpus total.
//
// Usage: node scripts/add-entries.mjs <propositions.md> [--dry-run]
//
// Propositions file format (written by the /veille skill):
//   ## 13
//   - **Complémentaire · Site** [Title](https://…) — Author, date. …
//     - Pourquoi : … (indented lines are ignored)
//
// Central entries go after the chapter's last Central entry, Complémentaire
// entries at the end of the list. A frontmatter "statut: proposé" becomes
// "statut: intégré" once the entries are written.

import { readFileSync, writeFileSync } from 'node:fs'
import {
  ANY_ENTRY, CHAPTER_FILE, PRESENTATION, chapterFiles, corpusUrls, normalizeUrl, parseEntry,
} from './lib/corpus.mjs'

function parsePropositions(text) {
  const entries = []
  let chapter = null
  for (const line of text.split('\n')) {
    const heading = line.match(/^## (\d{1,2})\s*$/)
    if (heading) chapter = Number(heading[1])
    else if (ANY_ENTRY.test(line)) {
      const entry = parseEntry(line)
      if (!entry) throw new Error(`Entrée mal formée : ${line.slice(0, 100)}`)
      if (!chapter) throw new Error(`Entrée sans chapitre « ## N » au-dessus : ${line.slice(0, 100)}`)
      entries.push({ chapter, line, ...entry })
    }
  }
  return entries
}

function validate(entries, files) {
  const known = corpusUrls()
  const seen = new Set()
  for (const { chapter, url } of entries) {
    if (!files.has(chapter)) throw new Error(`Chapitre inconnu : ${chapter}`)
    const key = normalizeUrl(url)
    if (known.has(key)) throw new Error(`Déjà dans le corpus : ${url}`)
    if (seen.has(key)) throw new Error(`En double dans les propositions : ${url}`)
    seen.add(key)
  }
}

function insert(path, { line, weight }) {
  const lines = readFileSync(path, 'utf8').trimEnd().split('\n')
  const indexes = lines.flatMap((text, index) => (parseEntry(text) ? [index] : []))
  const centrals = indexes.filter(index => parseEntry(lines[index]).weight === 'Central')
  const position = weight === 'Central'
    ? (centrals.length ? centrals.at(-1) + 1 : indexes[0])
    : indexes.at(-1) + 1
  lines.splice(position, 0, line)
  writeFileSync(path, `${lines.join('\n')}\n`)
}

function refreshTotal() {
  const counts = {}
  for (const path of chapterFiles()) {
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const entry = parseEntry(line)
      if (entry) counts[entry.site] = (counts[entry.site] ?? 0) + 1
    }
  }
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0)
  const detail = Object.entries(counts)
    .sort(([siteA, a], [siteB, b]) => b - a || siteA.localeCompare(siteB, 'fr'))
    .map(([site, count]) => `${count} ${site}`)
    .join(', ')
  const text = readFileSync(PRESENTATION, 'utf8').replace(
    /^\*\*Corpus :\*\* .*$/m,
    `**Corpus :** ${total} références, issues de ${Object.keys(counts).length} sites de publication : ${detail}.`,
  )
  writeFileSync(PRESENTATION, text)
  return total
}

const [path, flag] = process.argv.slice(2)
if (!path) {
  console.error('Usage : node scripts/add-entries.mjs <propositions.md> [--dry-run]')
  process.exit(1)
}

try {
  const text = readFileSync(path, 'utf8')
  const files = new Map(chapterFiles().map(file => [Number(file.split('/').pop().match(CHAPTER_FILE)[1]), file]))
  const entries = parsePropositions(text)
  validate(entries, files)

  if (flag === '--dry-run') {
    for (const { chapter, weight, site, url } of entries) console.log(`ch. ${chapter} · ${weight} · ${site} — ${url}`)
    console.log(`${entries.length} entrées valides, rien n'a été écrit.`)
  }
  else {
    for (const entry of entries) insert(files.get(entry.chapter), entry)
    writeFileSync(path, text.replace(/^statut: proposé$/m, 'statut: intégré'))
    const chapters = [...new Set(entries.map(entry => entry.chapter))].sort((a, b) => a - b)
    console.log(`${entries.length} entrées insérées (chapitres ${chapters.join(', ')}) ; total : ${refreshTotal()}`)
  }
}
catch (error) {
  console.error(error.message)
  process.exit(1)
}
