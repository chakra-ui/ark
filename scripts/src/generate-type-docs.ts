import { findUpSync } from 'find-up'
import fs from 'fs-extra'
import { readFile } from 'fs/promises'
import { globby } from 'globby'
import path, { dirname } from 'path'
import prettier from 'prettier'
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

const prettierConfig = await prettier.resolveConfig('.')

function tryPrettier(typeName: string) {
  try {
    const prefix = 'type ONLY_FOR_FORMAT = '
    const prettyType = prettier.format(prefix + typeName, {
      ...prettierConfig,
      parser: 'typescript',
    })
    return prettyType.replace(prefix, '').trim()
  } catch {
    return typeName
  }
}

function extractPropertiesOfTypeName(
  searchTerm: string | RegExp,
  sourceFile: ts.SourceFile,
  typeChecker: ts.TypeChecker,
  { shouldIgnoreProperty = () => false }: TypeSearchOptions = {},
) {
  const regexSearchTerm = typeof searchTerm === 'string' ? `^${searchTerm}$` : searchTerm
  const typeStatements = sourceFile.statements.filter(
    (statement) =>
      (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)) &&
      new RegExp(regexSearchTerm).test(statement.name.getText()),
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
      const prettyType = tryPrettier(typeName)
      properties[propertyName] = {
        type: prettyType,
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
  const regex = /export type {([^}]+)}/gm
  const matches = fileContent?.match(regex)

  if (!matches) return []

  const results = matches.flatMap((match) => {
    const types = match.replace(/export type {/, '').replace(/}/, '')

    return types
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
      .sort((a, b) => a.length - b.length)
  })
  console.log(results)
  return results
}

const main = async () => {
  const framework = process.argv.slice(2)[0]

  const root = dirname(findUpSync('pnpm-lock.yaml')!)
  process.chdir(path.join(root, 'packages', framework))

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
        .map(searchType)
        .map((x) =>
          Object.fromEntries(
            Object.entries(x)
              .map((y) => [
                y[0],
                Object.fromEntries(Object.entries(y[1]).filter((z) => z[0] !== 'asChild')),
              ])
              .filter((y) => Object.keys(y[1]).length !== 0),
          ),
        )
        .filter((value) => Object.keys(value).length !== 0)
        .reduce((acc, value) => ({ ...acc, ...value }), {}),
    }))
    .map(async ({ component, typeExports }) => {
      fs.outputFileSync(
        path.join(component, 'docs', path.basename(component) + '.types.json'),
        prettier.format(JSON.stringify(typeExports), {
          ...prettierConfig,
          parser: 'json',
        }),
      )
    })
}

main().catch((err) => {
  const error = new Error(err)
  console.error(error.stack)
  process.exit(1)
})
