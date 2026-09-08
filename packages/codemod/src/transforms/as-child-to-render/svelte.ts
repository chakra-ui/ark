import MagicString from 'magic-string'
import type { TransformResult } from '../../types.ts'

/**
 * Svelte's `asChild` was already a snippet receiving a props function, and `render`
 * receives the same, so this is a rename. `render` also gets `state` as a second
 * parameter, which existing call sites simply do not declare.
 *
 *   {#snippet asChild(props)}   ->   {#snippet render(props)}
 */
export function svelteAsChildToRender(source: string, _filePath: string): TransformResult {
  const s = new MagicString(source)
  let count = 0
  const skipped: string[] = []

  // `{#snippet asChild(props)}` and its matching `{/snippet}` need no pairing work:
  // the closing tag is not named, so only the opening changes.
  const snippet = /\{#snippet\s+asChild\s*\(/g
  for (const match of source.matchAll(snippet)) {
    const start = match.index + match[0].indexOf('asChild')
    s.overwrite(start, start + 'asChild'.length, 'render')
    count++
  }

  // a bare `asChild` attribute has no snippet to carry the props, so it cannot be
  // rewritten mechanically
  for (const match of source.matchAll(/<[A-Z][\w.]*[^>]*?\basChild\b(?!\s*\()/g)) {
    skipped.push(`offset ${match.index}: bare asChild attribute, needs a render snippet by hand`)
  }

  return { code: count > 0 ? s.toString() : null, count, skipped }
}
