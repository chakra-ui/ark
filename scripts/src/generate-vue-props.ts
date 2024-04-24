import { parse } from 'node:path'
import { globby } from 'globby'
import { type OptionalKind, Project, type PropertySignatureStructure } from 'ts-morph'
import { chain } from 'voca'

const extractTypes = (component: string) => {
  const camelCaseComponent = chain(component).camelCase().value()

  const project = new Project()
  const sourceFile = project.addSourceFileAtPath(
    `../frameworks/vue/src/components/${component}/use-${component}.ts`,
  )
  const outputFile = project.createSourceFile(
    `../frameworks/vue/src/components/${component}/${component}.types.ts`,
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
    name: `${chain(component).camelCase().capitalize().value()}RootProps`,
    isExported: true,
    properties: props,
  })

  outputFile.addTypeAlias({
    name: `${chain(component).camelCase().capitalize().value()}RootEmits`,
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
  const components = await globby(['../frameworks/vue/src/components'], {
    onlyDirectories: true,
    deep: 1,
  })
  components
    .map((component) => parse(component).name)
    .filter((component) => ['segment-group'].includes(component))
    // .filter((component) => !['toast', 'format'].includes(component))
    .map((component) => {
      const componentName = parse(component).name
      console.log(`Generating types for ${componentName}`)
      extractTypes(componentName)
    })
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})

function escapePropertyName(name: string): string {
  if (/[^a-zA-Z0-9_]/.test(name)) {
    return `"${name}"`
  }
  return name
}
