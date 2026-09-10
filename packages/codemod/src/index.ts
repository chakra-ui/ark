#!/usr/bin/env node
import { availableParallelism } from 'node:os'
import * as p from '@clack/prompts'
import { Command } from 'commander'
import pc from 'picocolors'
import { printSummary, runTransform } from './run.ts'
import { findTransform, transforms } from './transforms.ts'
import { isTreeClean } from './utils/git.ts'

const interactive = process.stdout.isTTY === true

const program = new Command()

program.name('ark-codemod').description('Codemods for migrating Ark UI codebases between versions.')

program
  .command('list')
  .description('List the available transforms')
  .action(() => {
    for (const t of transforms) {
      console.log(`  ${pc.bold(t.name.padEnd(32))} ${t.description}`)
      console.log(`  ${' '.repeat(32)} ${pc.dim(t.extensions.join(', '))}`)
    }
  })

program
  .argument('[transform]', 'transform to run, e.g. react/as-child-to-render')
  .argument('[paths...]', 'files or globs to transform', ['**/*'])
  .option('-d, --dry', 'report what would change without writing', false)
  .option('--no-diff', 'in a dry run, print only the summary')
  .option('-e, --exclude <globs...>', 'globs to skip', [])
  .option('-c, --concurrency <n>', 'files to process at once', String(availableParallelism()))
  .option('--force', 'run even though the working tree has uncommitted changes', false)
  .action(async (name: string | undefined, paths: string[], options) => {
    if (interactive) p.intro(pc.bgCyan(pc.black(' ark-codemod ')))

    if (!name) {
      if (!interactive) {
        program.outputHelp()
        console.log(`\nRun ${pc.bold('ark-codemod list')} to see the transforms.`)
        return
      }
      const picked = await p.select({
        message: 'Which transform do you want to run?',
        options: transforms.map((t) => ({ value: t.name, label: t.name, hint: t.description })),
      })
      if (p.isCancel(picked)) return p.cancel('Nothing to do.')
      name = picked
    }

    const transform = findTransform(name)
    if (!transform) {
      const msg = `Unknown transform: ${name}. Run ${pc.bold('ark-codemod list')} to see what is available.`
      if (interactive) p.cancel(msg)
      else console.error(pc.red(msg))
      process.exitCode = 1
      return
    }

    const cwd = process.cwd()
    if (!options.dry && !options.force && !isTreeClean(cwd)) {
      if (interactive) {
        const proceed = await p.confirm({
          message: 'The working tree has uncommitted changes. Run anyway?',
          initialValue: false,
        })
        if (p.isCancel(proceed) || !proceed)
          return p.cancel('Commit or stash first so a bad run is one `git checkout` away.')
      } else {
        console.error(pc.red('The working tree has uncommitted changes.'))
        console.error('Commit or stash them first so a bad run is one `git checkout` away, or pass --force.')
        process.exitCode = 1
        return
      }
    }

    const spinner = interactive && !options.dry ? p.spinner() : undefined
    spinner?.start(`Running ${transform.name}`)
    const summary = await runTransform(transform, {
      cwd,
      include: paths,
      exclude: options.exclude,
      dry: options.dry,
      concurrency: Number(options.concurrency),
      printDiff: options.diff,
    })
    spinner?.stop(`Ran ${transform.name}`)

    printSummary(transform, summary, options.dry, interactive)
  })

export async function run(): Promise<void> {
  await program.parseAsync(process.argv)
}

await run()
