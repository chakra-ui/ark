import type { TransformResult } from '../../types.ts'

export function cssDataAttributes(source: string, _filePath: string): TransformResult {
  let count = 0
  const bump = (): string => {
    count++
    return ''
  }

  let code = source

  code = code.replace(
    /\[data-scope=(["']?)([\w-]+)\1\]\[data-part=(["']?)([\w-]+)\3\]/g,
    (_m, _q1, scope, _q2, part) => `${bump()}[data-${scope}-${part}]`,
  )
  code = code.replace(
    /\[data-part=(["']?)([\w-]+)\1\]\[data-scope=(["']?)([\w-]+)\3\]/g,
    (_m, _q1, part, _q2, scope) => `${bump()}[data-${scope}-${part}]`,
  )

  code = code.replace(/\[data-state=(["'])on\1\]/g, () => `${bump()}[data-pressed]`)

  code = code.replace(
    /(\[data-(?:toggle-group|toolbar)-root\])\[data-focus\]/g,
    (_m, sel) => `${bump()}${sel}:focus-within`,
  )
  code = code.replace(
    /(\[data-(?:toggle-group|toolbar)-item\])\[data-focus\]/g,
    (_m, sel) => `${bump()}${sel}:focus-visible`,
  )

  return { code: count > 0 ? code : null, count, skipped: [] }
}
