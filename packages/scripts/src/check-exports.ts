import { findUpSync } from 'find-up'
import { readFile } from 'fs/promises'
import { globby } from 'globby'
import path, { dirname } from 'path'

// converts `export { Toast, type ToastProps } from './toast' ...` to  ['Toast']
const findAllComponentExports = (fileContent?: string) => {
  if (!fileContent) return

  const cleanedContent = fileContent.replace(/(\r\n|\n|\r)/gm, ' ')
  const matches = cleanedContent.match(/export\s+{[^}]*}/gm)

  if (!matches) return

  return matches.flatMap((line) =>
    line
      .replace(/export\s+{/, '')
      .replace(/}/, '')
      .split(',')
      .map((x) => x.trim())
      .filter((x) => !x.startsWith('type '))
      .filter((x) => /^[A-Z]\w*/.test(x)),
  )
}

/**
 * This script checks that all components have the same exports in all frameworks.
 */
const main = async () => {
  const root = dirname(findUpSync('bun.lockb')!)
  process.chdir(root)

  const frameworks = await globby(['packages/frameworks'], { onlyDirectories: true, deep: 1 })
  const components = [
    ...new Set(
      (
        await Promise.all(
          frameworks.map((framework) =>
            globby([path.join(framework, 'src')], { onlyDirectories: true, deep: 1 }),
          ),
        )
      )
        .flatMap((x) => x)
        .map((x) => path.basename(x)),
    ),
  ]
  const invalidExports = (
    await Promise.all(
      components.map(async (component) => ({
        component,
        isValid: (
          await Promise.all(
            frameworks.map((framework) =>
              readFile(path.join(framework, 'src', component, 'index.ts'), {
                encoding: 'utf8',
              }).catch(() => undefined),
            ),
          )
        )
          .filter(Boolean)
          .map(findAllComponentExports)
          .every((val, i, arr) => JSON.stringify(val) == JSON.stringify(arr[0])),
      })),
    )
  ).filter((x) => !x.isValid)

  if (invalidExports.length > 0) {
    throw new Error(
      'Export check failed. The following components have different exports in different frameworks: ' +
        invalidExports.map((x) => x.component).join(', '),
    )
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
