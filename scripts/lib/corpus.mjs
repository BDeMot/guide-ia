// Shared helpers for the corpus scripts: chapter files, entries, watch registries.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'

export const CONTENT_DIR = 'content'
export const PRESENTATION = join(CONTENT_DIR, '1.presentation.md')
export const SOURCES = 'veille/sources.yml'
export const REJECTED = 'veille/ecartees.yml'
export const TO_CONSULT = 'veille/a-consulter.yml'

// Canonical label: **Central · Site**. Nuxt Studio may rewrite it as
// **[Central · Site]** or [**Central · Site**]; both are accepted.
export const ENTRY = /^- (?:\*\*\[|\[\*\*|\*\*)(Central|Complémentaire) · ([^\]*]+)(?:\]\*\*|\*\*\]|\*\*) \[[^\]]+\]\((https?:\/\/[^)\s]+)\)/
export const ANY_ENTRY = /^- (?:\*\*\[|\[\*\*|\*\*)(?:Central|Complémentaire) · /
export const CHAPTER_FILE = /^(\d{2})\.(.+)\.md$/

export function chapterFiles() {
  return readdirSync(CONTENT_DIR)
    .map(name => join(CONTENT_DIR, name))
    .filter(path => statSync(path).isDirectory() && /\/\d\.partie-/.test(path))
    .flatMap(dir => readdirSync(dir).map(name => join(dir, name)))
    .filter(path => CHAPTER_FILE.test(path.split('/').pop()))
    .sort((a, b) => a.split('/').pop().localeCompare(b.split('/').pop()))
}

export function parseEntry(line) {
  const match = line.match(ENTRY)
  return match && { weight: match[1], site: match[2], url: match[3] }
}

export function corpusUrls() {
  const urls = new Set()
  for (const path of chapterFiles()) {
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const entry = parseEntry(line)
      if (entry) urls.add(normalizeUrl(entry.url))
    }
  }
  return urls
}

export function readYaml(path, key) {
  if (!existsSync(path)) return []
  return parse(readFileSync(path, 'utf8'))?.[key] ?? []
}

export function normalizeUrl(url) {
  return url.trim().replace(/^http:/, 'https:').replace(/\/+$/, '')
}
