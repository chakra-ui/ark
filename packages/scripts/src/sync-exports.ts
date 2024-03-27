import { findUpSync } from 'find-up'
import { copy } from 'fs-extra'
import { globby } from 'globby'
import path, { dirname } from 'path'

/**
 * Copy all index.ts files from react to solid
 */
const main = async () => {
  const rootDir = dirname(findUpSync('bun.lockb')!)
  process.chdir(path.join(rootDir, 'packages', 'frameworks'))

  const indices = await globby(['./react/src/**/index.ts'])
  await Promise.all(indices.map((index) => copy(index, index.replace('react', 'solid'))))
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
