import { writeFileSync } from 'node:fs'
import { parse } from 'node:path'
import { readFileSync } from 'fs-extra'
import fsExtra from 'fs-extra/esm'
import { globby } from 'globby'
import { type ExportDeclaration, Node, Project } from 'ts-morph'
import { chain } from 'voca'
import { contextTemplate } from './template-context'
import { rootTemplate } from './template-root-sfc'
import { template } from './template-sfc'

const reanmeParts = async (component: string) => {
  const parts = await globby([`../frameworks/vue/src/components/${component}/**.tsx`])

  parts.map((part) => {
    const partName = parse(part).name

    const camelCaseComonent = chain(component).camelCase().value()
    const pascalCaseComponent = chain(component).camelCase().capitalize().value()
    const pascalCasePart = chain(partName).camelCase().capitalize().value()
    const camelCasePart = chain(partName.replace(`${component}-`, ''))
      .camelCase()
      .value()

    const content = part.includes('root')
      ? rootTemplate
      : part.includes('context')
        ? contextTemplate
        : template

    fsExtra.outputFileSync(
      part.replace('.tsx', '.vue'),
      content
        .replaceAll('{{ PascalCasePart }}', pascalCasePart)
        .replaceAll('{{ CamelCaseComponent }}', camelCaseComonent)
        .replaceAll('{{ PascalCaseComponent }}', pascalCaseComponent)
        .replaceAll('{{ CamelCasePart }}', camelCasePart),
    )
  })
}

const reExportIndexFile = async (component: string) => {
  const project = new Project({
    useInMemoryFileSystem: true,
  })
  const fileContent = readFileSync(`../frameworks/vue/src/components/${component}/index.ts`, 'utf8')
  const sourceFile = project.createSourceFile('index.ts', fileContent)

  const data = sourceFile
    .forEachDescendantAsArray()
    .filter((node): node is ExportDeclaration => Node.isExportDeclaration(node))
    .flatMap((node) => {
      const moduleSpecifier = node.getModuleSpecifier()?.getText()
      if (moduleSpecifier?.startsWith(`'./${component}-`)) {
        return node.getText().replace('export {', 'export { default as').replace(/'$/, ".vue'")
      }
      return node.getText()
    })

  writeFileSync(`../frameworks/vue/src/components/${component}/index.ts`, data.join('\n'))
}

const reExportBarrelFile = async (component: string) => {
  const project = new Project({
    useInMemoryFileSystem: true,
  })
  const fileContent = readFileSync(
    `../frameworks/vue/src/components/${component}/${component}.ts`,
    'utf8',
  )
  const sourceFile = project.createSourceFile('index.ts', fileContent)

  const data = sourceFile
    .forEachDescendantAsArray()
    .filter((node): node is ExportDeclaration => Node.isExportDeclaration(node))
    .flatMap((node) => {
      const moduleSpecifier = node.getModuleSpecifier()?.getText()
      if (moduleSpecifier?.startsWith(`'./${component}-`)) {
        return node
          .getText()
          .replaceAll(/\b(\w+)\b(?<!Props\b)(?=\s+as)/g, 'default')
          .replace(/'$/, ".vue'")
      }
      return node.getText()
    })

  writeFileSync(`../frameworks/vue/src/components/${component}/${component}.ts`, data.join('\n'))
}

const main = async () => {
  const component = process.argv.slice(2)[0]
  console.log('Generating types for', component)
  // await reanmeParts(component)
  await reExportIndexFile(component)
  await reExportBarrelFile(component)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
