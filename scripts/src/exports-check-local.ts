import { readFileSync } from 'node:fs'
import { basename, dirname } from 'node:path'
import { globby } from 'globby'
import { type ExportDeclaration, Node, Project } from 'ts-morph'

const main = async () => {
  const files = await globby(['../packages/react/src/components/*/index.ts'], {})
  files
    .sort()
    .map((file) => ({
      id: basename(dirname(file)),
      name: toPascalCase(basename(dirname(file))),
      indexFile: file,
      componentFile: file.replace('index', basename(dirname(file))),
    }))
    .filter((entry) => !['presence', 'portal'].includes(entry.id))
    .map((entry) => ({
      name: entry.name,
      indexExports: getExportsFromSourceFile(entry.indexFile)
        .map((x) => (entry.name === 'Tabs' ? x.replace('Tabs', 'Tab') : x))
        .filter((x) => !/^use/i.test(x)) // filter hooks
        .filter((x) => !/^createToaster/i.test(x))
        .filter((x) => !/^toaster/i.test(x))
        .map((item) => item.replace(entry.name === 'Tabs' ? 'Tab' : entry.name, '')),
      componentExports: getExportsFromSourceFile(entry.componentFile),
    }))
    .map((entry) => ({
      name: entry.name,
      diff: diffArray(entry.indexExports, entry.componentExports),
    }))
    .map((diff) => {
      if (diff.diff.inFirstOnly.length > 0 || diff.diff.inSecondOnly.length > 0) {
        console.log(diff)
      }
    })
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
        .map((namedExport) => namedExport.getAliasNode()?.getText() ?? namedExport.getName()),
    )
}

const diffArray = (a: string[], b: string[]) => ({
  inFirstOnly: a.filter((x) => !b.includes(x)),
  inSecondOnly: b.filter((x) => !a.includes(x)),
})

const toPascalCase = (input: string): string =>
  input
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
