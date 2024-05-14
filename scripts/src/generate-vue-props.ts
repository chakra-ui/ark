import { parse } from 'node:path'
import { globby } from 'globby'
import { type OptionalKind, Project, type PropertySignatureStructure } from 'ts-morph'
import { chain } from 'voca'

const extractTypes = (component: string) => {
  console.log('Generating props for', component)
  const camelCaseComponent = chain(component).camelCase().value()

  const project = new Project()
  const sourceFile = project.addSourceFileAtPath(
    `../packages/vue/src/components/${component}/use-${component}.ts`,
  )
  const outputFile = project.createSourceFile(
    `../packages/vue/src/components/${component}/${component}.types.ts`,
    '',
    {
      overwrite: true,
    },
  )

  const propperties = sourceFile
    .getInterfaceOrThrow(`Use${chain(component).camelCase().capitalize().value()}Props`)
    .getType()
    .getProperties()
    .sort((a, b) => (a.getName() > b.getName() ? 1 : -1))

  const props: OptionalKind<PropertySignatureStructure>[] = propperties
    .filter((property) => !property.getName().startsWith('on'))
    .map((property) => {
      const comment = property
        .getDeclarations()
        .flatMap((declaration) =>
          declaration.getLeadingCommentRanges().map((comment) => `${comment.getText()}\n`),
        )
      return {
        name: escapePropertyName(property.getName()),
        type: property.getTypeAtLocation(sourceFile).getText(sourceFile),
        hasQuestionToken: property.isOptional(),
        leadingTrivia: comment,
      }
    })

  const emits = propperties
    .filter((property) => property.getName().startsWith('on'))
    .map((property) => ({
      name: property
        .getName()
        .replace(/^on/, '')
        .replace(/^(.)/, (c) => c.toLowerCase()),
      comment: property
        .getDeclarations()
        .flatMap((declaration) =>
          declaration.getLeadingCommentRanges().map((comment) => comment.getText()),
        ),
      type: property
        .getTypeAtLocation(sourceFile)
        .getCallSignatures()
        .flatMap((signature) =>
          signature
            .getParameters()
            .map((param) => [
              param.getName(),
              param.getTypeAtLocation(sourceFile).getText(sourceFile),
            ]),
        ),
    }))

  const modelValue = props.find((prop) => prop.name === 'modelValue')
  if (modelValue) {
    emits.push({
      name: 'update:modelValue',
      comment: [
        `/**
      * The callback fired when the model value changes.
      */`,
      ],
      type: [['value', modelValue.type?.toString() ?? 'any']],
    })
  }

  outputFile.addImportDeclaration({
    moduleSpecifier: `@zag-js/${component === 'segment-group' ? 'radio-group' : component}`,
    namespaceImport: camelCaseComponent === 'switch' ? 'zagSwitch' : camelCaseComponent,
    isTypeOnly: true,
  })

  outputFile.addInterface({
    name: 'RootProps',
    isExported: true,
    properties: props,
  })

  outputFile.addTypeAlias({
    name: 'RootEmits',
    isExported: true,
    type: `{ ${emits
      .map(
        (emit) =>
          `\n${emit.comment}
        ${escapePropertyName(emit.name)}: [${emit.type.map(([key, value]) => `${key}: ${value}`)}]`,
      )
      .join('; ')}}`,
  })
  outputFile.organizeImports()
  outputFile.saveSync()
}

const main = async () => {
  const component = process.argv.slice(2)[0]

  if (component) {
    extractTypes(component)
    return
  }

  console.log('Generating props for all components')
  const components = await globby(['../packages/vue/src/components/*'], {
    onlyDirectories: true,
    deep: 1,
  })
  Promise.all(
    components
      .map((component) => parse(component).base)
      .filter((x) => !['format', 'toast'].includes(x))
      .map(extractTypes),
  )
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})

function escapePropertyName(name: string): string {
  if (/[^a-zA-Z0-9_]/.test(name)) {
    return `"${name}"` // aria-label -> 'aria-label'
  }
  return name
}
