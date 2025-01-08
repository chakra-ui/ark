import { globby } from 'globby'
import fs from 'node:fs/promises'
import path from 'node:path'

const anatomies = await globby('../packages/anatomy/src/*/index.ts')

// biome-ignore lint/complexity/noForEach: <explanation>
anatomies.forEach(async (story) => {
  const component = path.parse(path.parse(story).dir).base

  const dest = story
    .replace('packages/anatomy/src', 'packages/vue/src/components')
    .replace('index.ts', `${component}.anatomy.ts`)

  await fs.copyFile(story, dest)
})
