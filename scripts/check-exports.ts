import { readFile } from 'fs/promises'
import { globby } from 'globby'
import path from 'path'

/**
 * This script checks that all components have the same exports in all frameworks.
 */
const main = async () => {
  const frameworks = await globby(['packages'], { onlyDirectories: true, deep: 1 })
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
          .every((val, i, arr) => val === arr[0]),
      })),
    )
  ).filter((x) => !x.isValid)

  if (invalidExports.length > 0) {
    console.error('Export check failed')
    console.error(
      'The following components have different exports in different frameworks:',
      invalidExports.map((x) => x.component).join(', '),
    )

    process.exit(1)
  }
}

main()
