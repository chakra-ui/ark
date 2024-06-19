import { readFileSync } from 'node:fs'
import { globby } from 'globby'
import { type ExportDeclaration, Node, Project } from 'ts-morph'

const frameworks = ['react', 'solid', 'vue']

const main = async () => {
  const components = await globby([
    '../packages/react/src/components/*/index.ts',
    '!../packages/react/src/components/{portal,presence}/**',
  ])

  const frameworkExports = components
    // TODO remove after signature-pad is added to all frameworks
    .filter((component) => !component.includes('signature-pad'))
    .sort()
    .map((component) =>
      frameworks.map((framework) => ({
        framework,
        exports: getExportsFromSourceFile(component.replace('react', framework)),
      })),
    )

  const results = removeCommonExports(frameworkExports)
  if (results.length > 0) {
    console.log('Some components have different exports:')
    console.log(results)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})

const getExportsFromSourceFile = (path: string): string[] => {
  const project = new Project({
    useInMemoryFileSystem: true,
  })

  const fileContent = readFileSync(path, 'utf8')
  const sourceFile = project.createSourceFile('index.ts', fileContent)

  return sourceFile
    .forEachDescendantAsArray()
    .filter((node): node is ExportDeclaration => Node.isExportDeclaration(node))
    .flatMap((node) =>
      node
        .getNamedExports()
        .map((namedExport) => namedExport.getAliasNode()?.getText() ?? namedExport.getName())
        .filter((exp) => !exp.endsWith('Emits')),
    )
}

type FrameworkExports = {
  framework: string
  exports: string[]
}

function removeCommonExports(data: FrameworkExports[][]): FrameworkExports[][] {
  return data
    .map((subArray) => {
      const commonExports = subArray.reduce<string[]>((common, item, index) => {
        if (index === 0) {
          return item.exports.slice()
        }
        return common.filter((exp) => item.exports.includes(exp))
      }, [])

      return subArray
        .map((item) => ({
          framework: item.framework,
          exports: item.exports.filter((exp) => !commonExports.includes(exp)),
        }))
        .filter((item) => item.exports.length > 0)
    })
    .filter((subArray) => subArray.length > 0)
}
