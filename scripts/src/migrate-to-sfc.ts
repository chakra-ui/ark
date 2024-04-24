import { parse } from 'node:path'
import fsExtra from 'fs-extra/esm'
import { globby } from 'globby'
import { chain } from 'voca'
import { contextTemplate } from './template-context'
import { rootTemplate } from './template-root-sfc'
import { template } from './template-sfc'

const main = async () => {
  const component = process.argv.slice(2)[0]
  console.log('Generating types for', component)

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

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
