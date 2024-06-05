import fs from 'node:fs/promises'
import { globby } from 'globby'

const stories = await globby('../packages/*/src/components/*/*root.tsx')

// biome-ignore lint/complexity/noForEach: <explanation>
stories.forEach(async (story) => {
  // create a copy of the file with the new name *-root-provider.tsx
  // replace the name of the component with *-root-provider

  const content = await fs.readFile(story, 'utf-8')
  const newContent = content.replaceAll(/Root/g, 'RootProvider')

  fs.writeFile(story.replace('root.tsx', 'root-provider.tsx'), newContent, 'utf-8')
})

console.log(stories)
