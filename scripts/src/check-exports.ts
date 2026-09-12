import { existsSync, readFileSync } from 'node:fs'
import { globby } from 'globby'
import { type ExportDeclaration, Node, Project } from 'ts-morph'

const frameworks = ['react', 'solid', 'vue', 'svelte']

const indexPath = (framework: string, component: string) => {
  if (framework === 'svelte') return `../packages/svelte/src/lib/components/${component}/index.ts`
  const ext = framework === 'solid' ? 'tsx' : 'ts'
  return `../packages/${framework}/src/components/${component}/index.${ext}`
}

const main = async () => {
  const components = await globby([
    '../packages/react/src/components/*/index.ts',
    '!../packages/react/src/components/{portal,presence,client-only}/**',
  ])

  const names = components.map((file) => file.split('/').at(-2) as string).sort()

  const problems = names.flatMap((component) => {
    const byFramework = frameworks.map((framework) => ({
      framework,
      exports: getExportsFromSourceFile(indexPath(framework, component)),
    }))

    const absent = byFramework.filter((it) => it.exports === null).map((it) => it.framework)
    if (absent.length) return [`${component}: no index file for ${absent.join(', ')}`]

    const present = byFramework as { framework: string; exports: string[] }[]
    const common = present.reduce<string[]>(
      (acc, it, index) => (index === 0 ? it.exports.slice() : acc.filter((exp) => it.exports.includes(exp))),
      [],
    )

    const lines = present
      .filter((it) => it.exports.some((exp) => !common.includes(exp)))
      .map((it) => `    only in ${it.framework}: ${it.exports.filter((exp) => !common.includes(exp)).join(', ')}`)

    return lines.length ? [`  ${component}\n${lines.join('\n')}`] : []
  })

  if (problems.length > 0) {
    console.log(`Some components have different exports (${problems.length}):\n`)
    console.log(problems.join('\n'))
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})

const getExportsFromSourceFile = (path: string): string[] | null => {
  if (!existsSync(path)) return null

  const project = new Project({
    useInMemoryFileSystem: true,
  })

  const sourceFile = project.createSourceFile('index.ts', readFileSync(path, 'utf8'))

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
