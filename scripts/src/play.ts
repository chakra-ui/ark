import fs from 'node:fs/promises'
import { globby } from 'globby'

const anatomies = await globby('../packages/anatomy/src/*/index.ts')

// biome-ignore lint/complexity/noForEach: <explanation>
anatomies.forEach(async (story) => {
  fs.copyFile(story, story.replace('packages/anatomy/src', 'packages/react/src/components'))
})
