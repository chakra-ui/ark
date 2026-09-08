import { readFile, writeFile } from 'node:fs/promises'
import { extname, relative } from 'node:path'
import { globby } from 'globby'
import pc from 'picocolors'
import type { TransformDef } from './types.ts'
import { unifiedDiff } from './utils/diff.ts'

export interface RunOptions {
  cwd: string
  include: string[]
  exclude: string[]
  dry: boolean
  concurrency: number
  printDiff: boolean
}

export interface RunSummary {
  scanned: number
  changed: number
  sites: number
  skipped: Array<[string, string]>
}

export async function runTransform(transform: TransformDef, options: RunOptions): Promise<RunSummary> {
  const files = await globby(options.include, {
    cwd: options.cwd,
    absolute: true,
    gitignore: true,
    ignore: ['**/node_modules/**', '**/dist/**', ...options.exclude],
  })

  const targets = files.filter((f) => transform.extensions.includes(extname(f)))
  const summary: RunSummary = { scanned: targets.length, changed: 0, sites: 0, skipped: [] }

  // a bounded pool: reads are IO-bound but parsing is not, so unbounded fan-out
  // just thrashes on a large repo
  let cursor = 0
  const workers = Array.from({ length: Math.max(1, options.concurrency) }, async () => {
    while (true) {
      const index = cursor++
      if (index >= targets.length) return
      const path = targets[index]
      const source = await readFile(path, 'utf8')
      if (!source.includes('asChild') && !source.includes('as-child')) continue

      const result = transform.run(source, path)
      for (const reason of result.skipped) summary.skipped.push([relative(options.cwd, path), reason])
      if (!result.code) continue

      summary.changed++
      summary.sites += result.count
      if (options.dry) {
        if (options.printDiff) console.log(`\n${unifiedDiff(source, result.code, relative(options.cwd, path))}`)
      } else {
        await writeFile(path, result.code)
      }
    }
  })

  await Promise.all(workers)
  return summary
}

export function printSummary(transform: TransformDef, summary: RunSummary, dry: boolean): void {
  const verb = dry ? 'would change' : 'changed'
  console.log(
    `\n${pc.bold(transform.name)}  scanned ${summary.scanned} files, ${verb} ${pc.green(String(summary.changed))} (${summary.sites} sites)`,
  )
  if (summary.skipped.length > 0) {
    console.log(pc.yellow(`\n${summary.skipped.length} site(s) left for you:`))
    for (const [file, reason] of summary.skipped) console.log(`  ${pc.dim(file)}  ${reason}`)
  }
  if (dry && summary.changed > 0) console.log(pc.dim('\nDry run. Re-run without --dry to write.'))
}
