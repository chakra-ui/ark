import path from 'node:path'
import ts from 'typescript'

function extractPropertiesOfTypeName(
  typeName: string,
  sourceFile: ts.SourceFile,
  typeChecker: ts.TypeChecker,
) {
  const properties: { propertyName: string; typeName: string; description: string[] }[] = []
  const typeStatement = sourceFile.statements.find(
    (statement) => ts.isTypeAliasDeclaration(statement) && statement.name.getText() === typeName,
  )
  const type = typeChecker.getTypeAtLocation(typeStatement!)
  for (const property of type.getProperties()) {
    const propertyName = property.getName()
    const type = typeChecker.getTypeOfSymbolAtLocation(property, sourceFile)
    const typeName = typeChecker.typeToString(type)
    properties.push({
      propertyName,
      typeName,
      description: property.getDocumentationComment(typeChecker).map((comment) => comment.text),
    })
  }

  return properties
}

function createTypeSearch(tsConfigPath: string) {
  const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile)
  const basePath = path.dirname(tsConfigPath)
  const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, basePath)
  const options = config.options
  const fileNames = config.fileNames

  const program = ts.createProgram(fileNames, options)
  const sourceFiles = program.getSourceFiles()

  return (type: string) => {
    for (const sourceFile of sourceFiles) {
      const typeInfo = extractPropertiesOfTypeName(type, sourceFile!, program.getTypeChecker())
      if (typeInfo?.length) {
        return typeInfo.reduce((acc, { propertyName, typeName, description }) => {
          acc[propertyName] = { typeName, description }
          return acc
        }, {} as Record<string, { typeName: string; description: string[] }>)
      }
    }

    return null
  }
}

const typeSearch = createTypeSearch('tsconfig.json')
const searchTerm = 'UseAccordionProps'
console.log('Result for "%s"', searchTerm)
const result = typeSearch(searchTerm)
console.log(JSON.stringify(result, null, 2))
