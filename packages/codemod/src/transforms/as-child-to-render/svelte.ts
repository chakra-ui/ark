import MagicString from 'magic-string'
import type { TransformResult } from '../../types.ts'

export function svelteAsChildToRender(source: string, _filePath: string): TransformResult {
  const s = new MagicString(source)
  let count = 0
  const skipped: string[] = []

  const snippet = /\{#snippet\s+asChild\s*\(/g
  for (const match of source.matchAll(snippet)) {
    const start = match.index + match[0].indexOf('asChild')
    s.overwrite(start, start + 'asChild'.length, 'render')
    count++
  }

  for (const match of source.matchAll(/<[A-Z][\w.]*[^>]*?\basChild\b(?!\s*\()/g)) {
    skipped.push(`offset ${match.index}: bare asChild attribute, needs a render snippet by hand`)
  }

  return { code: count > 0 ? s.toString() : null, count, skipped }
}
