import { findUpSync } from 'find-up'
import { copy } from 'fs-extra'
import { globby } from 'globby'
import path, { basename, dirname, join } from 'path'

/**
 * Copy all index.ts files from react to solid
 */
const main = async () => {
  const rootDir = dirname(findUpSync('bun.lockb')!)
  process.chdir(path.join(rootDir, 'packages', 'frameworks'))

  const components = await globby(['./react/src/*'], { onlyDirectories: true, deep: 1 })
  console.log(components)
  await Promise.all(
    components
      .map((component) => [
        join(component, 'index.ts'),
        join(component, basename(component) + '.tsx'),
      ])
      .flatMap((x) => x)
      .map((path) => {
        console.log(path)
        copy(path, path.replace('react', 'solid'))
      }),
  )

  // const components = await globby(['./solid/src/*/*context.ts'])
  // for (const component of components) {
  //   move(component, join(dirname(component), 'use-' + basename(component)))
  // }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
