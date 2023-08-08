import { copy } from 'fs-extra'
import { globby } from 'globby'

/**
 * Copy all index.ts files from react to solid
 */
const main = async () => {
  const indices = await globby(['../packages/react/src/**/index.ts'])
  await Promise.all(indices.map((index) => copy(index, index.replace('react', 'vue'))))
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
