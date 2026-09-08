import pc from 'picocolors'

/** A minimal line diff, enough to review a dry run without pulling in a diff library. */
export function unifiedDiff(before: string, after: string, path: string): string {
  const a = before.split('\n')
  const b = after.split('\n')
  const lines: string[] = [pc.bold(path)]

  let i = 0
  let j = 0
  while (i < a.length || j < b.length) {
    if (a[i] === b[j]) {
      i++
      j++
      continue
    }
    // resynchronise on the next line that matches, so a rewrite shows as a block
    const next = b.indexOf(a[i], j)
    if (next === -1) {
      if (i < a.length) lines.push(pc.red(`- ${a[i++]}`))
    } else {
      while (j < next) lines.push(pc.green(`+ ${b[j++]}`))
    }
    if (lines.length > 400) {
      lines.push(pc.dim('  … truncated'))
      break
    }
  }

  return lines.join('\n')
}
