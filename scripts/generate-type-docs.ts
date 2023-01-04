import fs from 'fs-extra'
import { readFile } from 'fs/promises'
import { globby } from 'globby'
import path from 'path'
import ts from 'typescript'

type TypeProperties = Record<
  string,
  {
    type: string
    defaultValue?: string
    isRequired: boolean
    description?: string
  }
>

type TypeSearchOptions = {
  shouldIgnoreProperty?: (property: ts.Symbol) => boolean | undefined
}

function extractPropertiesOfTypeName(
  searchTerm: string | RegExp,
  sourceFile: ts.SourceFile,
  typeChecker: ts.TypeChecker,
  { shouldIgnoreProperty = () => false }: TypeSearchOptions = {},
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
      const nonNullableType = type.getNonNullableType()
      const typeName = typeChecker.typeToString(nonNullableType)
      const isRequired = nonNullableType === type && typeName !== 'any'
      const defaultValueType = type.getDefault()
      const defaultValue = defaultValueType ? typeChecker.typeToString(defaultValueType) : undefined
      if (shouldIgnoreProperty(property)) {
        continue
      }
      properties[propertyName] = {
        type: typeName,
        defaultValue,
        isRequired,
        description:
          property
            .getDocumentationComment(typeChecker)
            .map((comment) => comment.text)
            .join('\n') || undefined,
      }
    }
    if (Object.keys(properties).length) {
      results[(typeStatement as any).name.getText()] = Object.fromEntries(
        Object.entries(properties)
          .sort(([aName], [bName]) => aName.localeCompare(bName))
          .sort(([, a], [, b]) => (a.isRequired === b.isRequired ? 0 : a.isRequired ? -1 : 1)),
      )
    }
  }

  return Object.keys(results).length ? results : null
}

function createTypeSearch(tsConfigPath: string, typeSearchOptions: TypeSearchOptions = {}) {
  const { shouldIgnoreProperty } = typeSearchOptions
  const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile)
  const basePath = path.dirname(tsConfigPath)
  const { fileNames, options } = ts.parseJsonConfigFileContent(configFile.config, ts.sys, basePath)

  const program = ts.createProgram(fileNames, options)
  const sourceFiles = program.getSourceFiles()

  return (searchTerm: Parameters<typeof extractPropertiesOfTypeName>[0]) => {
    const results: Record<string, TypeProperties> = {}
    for (const sourceFile of sourceFiles) {
      const typeInfo = extractPropertiesOfTypeName(
        searchTerm,
        sourceFile,
        program.getTypeChecker(),
        { shouldIgnoreProperty },
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

function shouldIgnoreProperty(property: ts.Symbol) {
  const sourceFileName = getSourceFileName(property)
  const isExternal =
    sourceFileName?.includes('node_modules') && !sourceFileName?.includes('@zag-js')
  const isExcludedByName = ['children'].includes(property.getName())
  return isExternal || isExcludedByName
}

function extractTypeExports(fileContent?: string) {
  return fileContent?.match(/(?<=export\s{).*(?=})/gm)?.flatMap((line) =>
    line
      .split(',')
      .map((x) => x.trim())
      .filter((x) => x.startsWith('type '))
      .map((x) => x.replace('type ', '')),
  )
}

const main = async () => {
  const components = await globby(['src'], { onlyDirectories: true, deep: 1 })

  const componentExportMap: Record<string, string[]> = Object.fromEntries(
    await Promise.all(
      components.map(async (component) => {
        const fileContent = await readFile(path.join(component, 'index.ts'), {
          encoding: 'utf8',
        }).catch(() => undefined)
        return [component, extractTypeExports(fileContent)]
      }),
    ),
  )

  const searchType = createTypeSearch('tsconfig.json', { shouldIgnoreProperty })
  Object.entries(componentExportMap)
    .flatMap(([component, typeExports]) => ({
      component,
      typeExports: typeExports
        .map((x) => searchType(new RegExp('^' + x + '$')))
        .filter((value) => Object.keys(value).length !== 0)
        .reduce((acc, value) => ({ ...acc, ...value }), {}),
    }))
    .map(({ component, typeExports }) => {
      fs.outputJsonSync(
        path.join(component, 'docs', path.basename(component) + '.types.json'),
        typeExports,
      )
    })
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
