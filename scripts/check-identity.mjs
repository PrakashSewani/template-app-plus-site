#!/usr/bin/env node
/**
 * Identity guard — the repository is named and has a vision, or this fails.
 *
 * Run by .github/workflows/identity.yml on every pull request to `dev`, and by hand at any time:
 *   node scripts/check-identity.mjs
 *
 * It exists because rule 3 (identity PR first) is only real if something refuses the alternative.
 * It checks the template's own markers, not style: no placeholders left, no template slug left.
 */
import { readFileSync, existsSync } from 'node:fs'

const TEMPLATE_SLUGS = ['template-app-plus-site', 'template-open-source-tool']
const PLACEHOLDERS = [
  '**Fill this in first.**',
  'One paragraph. What is it, in plain words?',
  'The people who will actually use it.',
  'What they do today instead',
  'What this is explicitly not',
  'How you\'ll know it works',
]
const FILES = ['README.md', 'docs/product.md', 'docs/decisions.md', 'docs/status.md', 'AGENTS.md']

const problems = []
for (const file of FILES) {
  if (!existsSync(file)) { problems.push(`${file}: missing`); continue }
  const text = readFileSync(file, 'utf8')
  for (const marker of PLACEHOLDERS) if (text.includes(marker)) problems.push(`${file}: still holds the template placeholder ${JSON.stringify(marker.slice(0, 40))}`)
  for (const slug of TEMPLATE_SLUGS) if (text.includes(slug)) problems.push(`${file}: still names the template (${slug})`)
}

const product = existsSync('docs/product.md') ? readFileSync('docs/product.md', 'utf8') : ''
if (product.split('\n').filter((line) => line.trim().startsWith('- ') || line.trim().length > 0).length < 20)
  problems.push('docs/product.md: too thin to be a vision — the identity PR fills it in')

if (problems.length) {
  console.error(`identity: FAIL — ${problems.length} problem(s), the identity PR (AGENTS.md rule 3) is not merged:`)
  for (const p of problems) console.error(`  - ${p}`)
  process.exit(1)
}
console.log('identity: PASS — named, with a vision, and no template placeholders left')
