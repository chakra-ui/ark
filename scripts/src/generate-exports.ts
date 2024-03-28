import { findUpSync } from 'find-up'
import { writeFile } from 'fs/promises'
import { globby } from 'globby'
import path, { basename, dirname, join } from 'path'
import prettier from 'prettier'

const prettierConfig = await prettier.resolveConfig('.')

const main = async () => {
  const root = dirname(findUpSync('bun.lockb')!)
  process.chdir(root)

  const components = await globby(['frameworks/react/src'], {
    onlyDirectories: true,
    deep: 1,
  })

  for (const component of components) {
    const files = await globby([join(component, '**/*.tsx')], {
      deep: 1,
      ignore: ['**/index.ts', `**/${basename(component)}.tsx`],
    })

    let content = ''
    const shortExports: string[] = []
    const shortTypeExports: string[] = []

    files.map((file) => {
      const name = toPascalCase(path.parse(file).name)
      const shortName = name.replace(toPascalCase(basename(component)), '')

      shortExports.push(shortName)
      shortTypeExports.push(`${shortName}Props`)

      content += `import { ${name} as ${shortName}, type ${name}Props as ${shortName}Props } from './${path.parse(file).name}'\n`
    })
    content += '\n'
    content += `export { ${shortExports.join(', ')} }\n`
    content += `export type { ${shortTypeExports.join(', ')} }\n`

    const result = await prettier.format(content, {
      ...prettierConfig,
      plugins: ['prettier-plugin-organize-imports'],
      parser: 'typescript',
    })

    await writeFile(join(component, `${basename(component)}.tsx`), result)
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})

const toPascalCase = (input: string): string => {
  return input
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}
