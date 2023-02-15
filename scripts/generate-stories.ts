import { outputFile } from 'fs-extra'
import { join } from 'path'
import { Node, Project } from 'ts-morph'
import { match } from 'ts-pattern'

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
              const code = `const ${name} = ${node.getInitializer()?.getText()}`
              stories[name] = code
            })
            .run()
        })
      })

      const outPath = join(sourceFile.getDirectoryPath(), 'docs', `${component}.stories.json`)

      return outputFile(outPath, JSON.stringify(stories, null, 2))
    }),
  )
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
