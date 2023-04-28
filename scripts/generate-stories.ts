import { outputFile } from 'fs-extra'
import { join } from 'path'
import prettier from 'prettier'
import { Node, Project } from 'ts-morph'
import { match } from 'ts-pattern'

const prettierConfig = await prettier.resolveConfig('.')

function format(stories: Record<string, string>) {
  return prettier.format(JSON.stringify(stories), {
    ...prettierConfig,
    parser: 'json',
  })
}

const isComponent = (str: string) => str.charAt(0) === str.charAt(0).toUpperCase()

const main = async () => {
  const project = new Project({})
  project.addSourceFilesAtPaths('src/**/*.stories.tsx')

  await Promise.all(
    project.getSourceFiles().map(async (sourceFile) => {
      const stories: Record<string, string> = {}

      const component = sourceFile.getBaseNameWithoutExtension().split('.')[0]

      sourceFile.getExportedDeclarations().forEach((decls) => {
        decls.forEach((decl) => {
          match(decl)
            .when(Node.isVariableDeclaration, (node) => {
              const name = node.getName()
              if (!isComponent(name)) return
              const code = `const ${name} = ${node.getInitializer()?.getText()}`
              stories[name] = code
            })
            .run()
        })
      })

      const outPath = join(sourceFile.getDirectoryPath(), 'docs', `${component}.stories.json`)

      return outputFile(outPath, format(stories))
    }),
  )
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
