import { parse } from 'node:path'
import { join } from 'node:path/posix'
import * as Bun from 'bun'
import { format } from 'prettier'

const toTitleCase = (str: string) => {
  const withoutExt = parse(str).name
  return withoutExt
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

export const generatePrompt = async (component: string) => {
  const glob = new Bun.Glob('*.{ts,tsx}')

  const cwd = `packages/react/src/components/${component}`

  let scannedFiles = await Array.fromAsync(glob.scan({ cwd }))
  scannedFiles = scannedFiles.filter((file) => !file.includes('.stories.tsx'))

  const contents: string[] = [
    `Here's an example of implementing the ${component} component from Zag.js`,
  ]

  for (const file of scannedFiles) {
    const absPath = join(cwd, file)

    const bunFile = Bun.file(absPath)
    const content = await bunFile.text()

    contents.push(`
### ${toTitleCase(file)}
      
\`\`\`tsx
${content}
\`\`\`
`)
  }

  const outPath = join(cwd, `${component}.prompt.md`)

  const prompt = await format(contents.join('\n\n'), {
    parser: 'mdx',
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'always',
  })

  await Bun.write(outPath, prompt)
  console.log(`Generated prompt at ${outPath}`)
}

const components = ['file-upload', 'popover', 'accordion', 'tabs', 'dialog']

const main = async () => {
  await Promise.all(components.map(generatePrompt))
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
