import { Project } from 'ts-morph'

const extractTypes = () => {
  const project = new Project()

  const sourceFile = project.addSourceFileAtPath(
    '../frameworks/react/src/components/accordion/accordion-root.tsx',
  )

  const propperties = sourceFile
    .getInterfaceOrThrow('AccordionRootProps')
    .getType()
    .getProperties()
    .sort((a, b) => (a.getName() > b.getName() ? 1 : -1))
    .filter((property) => {
      const sourceFileName = property
        .getTypeAtLocation(sourceFile)
        .getSymbol()
        ?.getDeclarations()[0]
        .getSourceFile()
        .getFilePath()

      if (sourceFileName !== undefined) {
      }
      return sourceFileName !== undefined
    })
    .filter((property) => !property.getTypeAtLocation(sourceFile).getText().includes('React.'))
    .map((property) => {
      const comment = property
        .getDeclarations()
        .flatMap((declaration) =>
          declaration.getLeadingCommentRanges().map((comment) => `${comment.getText()}\n`),
        )
      return {
        name: escapePropertyName(property.getName()),
        type: property.getTypeAtLocation(sourceFile).getText(),
        hasQuestionToken: property.isOptional(),
        leadingTrivia: comment,
      }
    })

  console.log(propperties)
}

const main = async () => {
  extractTypes()
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
