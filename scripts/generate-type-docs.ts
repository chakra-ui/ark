import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

type TypeProperties = Record<
  string,
  {
    type: string
    defaultValue?: string
    description?: string
  }
>

function extractPropertiesOfTypeName(
  searchTerm: string | RegExp,
  sourceFile: ts.SourceFile,
  typeChecker: ts.TypeChecker,
  shouldIgnoreProperty: (property: ts.Symbol) => boolean | undefined = () => false,
) {
  const typeStatements = sourceFile.statements.filter(
    (statement) =>
      ts.isTypeAliasDeclaration(statement) && new RegExp(searchTerm).test(statement.name.getText()),
  )

  const results: Record<string, TypeProperties> = {}
  for (const typeStatement of typeStatements) {
    const properties: TypeProperties = {}
    const type = typeChecker.getTypeAtLocation(typeStatement)
    for (const property of type.getProperties()) {
      const propertyName = property.getName()
      const type = typeChecker.getTypeOfSymbolAtLocation(property, sourceFile)
      const typeName = typeChecker.typeToString(type)
      if (shouldIgnoreProperty(property)) {
        continue
      }
      properties[propertyName] = {
        type: typeName,
        defaultValue: undefined, // TODO: get default value
        description:
          property
            .getDocumentationComment(typeChecker)
            .map((comment) => comment.text)
            .join('\n') || undefined,
      }
    }
    if (Object.keys(properties).length) {
      results[(typeStatement as any).name.getText()] = properties
    }
  }

  return Object.keys(results).length ? results : null
}

function createTypeSearch(
  tsConfigPath: string,
  shouldIgnoreProperty?: (property: ts.Symbol) => boolean | undefined,
) {
  const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile)
  const basePath = path.dirname(tsConfigPath)
  const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, basePath)
  const options = config.options
  const fileNames = config.fileNames

  const program = ts.createProgram(fileNames, options)
  const sourceFiles = program.getSourceFiles()

  return (searchTerm: Parameters<typeof extractPropertiesOfTypeName>[0]) => {
    const results: Record<string, TypeProperties> = {}
    for (const sourceFile of sourceFiles) {
      const typeInfo = extractPropertiesOfTypeName(
        searchTerm,
        sourceFile!,
        program.getTypeChecker(),
        shouldIgnoreProperty,
      )
      Object.assign(results, typeInfo)
    }
    return results
  }
}

function getSourceFileName(symbol: ts.Symbol): string | undefined {
  const declarations = symbol.getDeclarations()
  if (!declarations || declarations.length === 0) {
    return undefined
  }
  const sourceFile = declarations[0].getSourceFile()
  return sourceFile ? sourceFile.fileName : undefined
}

function shouldIgnoreExternalProperties(property: ts.Symbol) {
  const sourceFileName = getSourceFileName(property)
  return sourceFileName?.includes('node_modules') && !sourceFileName?.includes('@zag-js')
}

const typeSearch = createTypeSearch('tsconfig.json', shouldIgnoreExternalProperties)

const searchTerm = /.*Props$/
const result = typeSearch(searchTerm)

console.log(JSON.stringify(result, null, 2))
fs.writeFileSync('typedocs.json', JSON.stringify(result, null, 2))
