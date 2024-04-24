import { type OptionalKind, Project, type PropertySignatureStructure } from 'ts-morph'

const main = async () => {
  const project = new Project()
  const sourceFile = project.addSourceFileAtPath(
    '../frameworks/vue/src/components/accordion/use-accordion.ts',
  )
  const outputFile = project.createSourceFile(
    '../frameworks/vue/src/components/accordion-sfc/accordion.types.ts',
    '',
    {
      overwrite: true,
    },
  )

  const propperties = sourceFile
    .getInterfaceOrThrow('UseAccordionProps')
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
        name: property.getName(),
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
    moduleSpecifier: '@zag-js/accordion',
    namespaceImport: 'accordion',
    isTypeOnly: true,
  })

  outputFile.addInterface({
    name: 'AccordionRootProps',
    isExported: true,
    properties: props,
  })

  outputFile.addTypeAlias({
    name: 'AccordionRootEmits',
    isExported: true,
    type: `{ ${emits
      .map(
        (emit) =>
          `\n${emit.comment}
        "${emit.name}": [${emit.type.map(([key, value]) => `${key}: ${value}`)}]`,
      )
      .join('; ')}}`,
  })

  outputFile.saveSync()
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
