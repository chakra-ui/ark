import { parse } from 'node:path'
import { join } from 'node:path/posix'
import { parseArgs } from 'node:util'
import * as Bun from 'bun'
import { format } from 'prettier'

const toTitleCase = (str: string) => {
  const withoutExt = parse(str).name
  return withoutExt
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

export const generatePrompt = async (framework: string, component: string) => {
  const glob = new Bun.Glob('*.{ts,tsx,vue}')

  const cwd = `packages/${framework}/src/components/${component}`

  let scannedFiles = await Array.fromAsync(glob.scan({ cwd }))
  scannedFiles = scannedFiles.filter((file) => !file.includes('.stories.'))

  const contents: string[] = [
    `Here's an example of implementing the ${component} component from Zag.js in ${toTitleCase(framework)}:`,
  ]

  for (const file of scannedFiles) {
    const lang = file.endsWith('.vue') ? 'html' : 'tsx'
    const absPath = join(cwd, file)

    const bunFile = Bun.file(absPath)
    const content = await bunFile.text()

    contents.push(`
### ${toTitleCase(file)}
      
\`\`\`${lang} filename='${file}'
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

const allComponents = ['file-upload', 'popover', 'accordion', 'tabs', 'dialog']

const main = async () => {
  const { positionals, values } = parseArgs({
    args: Bun.argv,
    allowPositionals: true,
    options: {
      framework: {
        type: 'string',
        short: 'f',
        default: 'react',
      },
    },
  })

  let components = positionals.slice(2).flatMap((arg) => arg.split(/[ ,]/))
  if (!components.length) components = allComponents

  await Promise.all(
    components.map((component) => {
      return generatePrompt(values.framework || 'react', component)
    }),
  )
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
