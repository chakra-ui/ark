import { readFile } from 'node:fs/promises'
import path, { dirname } from 'node:path'
import { findUpSync } from 'find-up'
import fs from 'fs-extra'
import { globby, globbySync } from 'globby'
import prettier from 'prettier'
import { type ExportDeclaration, Node, Project } from 'ts-morph'
import ts from 'typescript'
import voca from 'voca'

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

async function tryPrettier(typeName: string) {
  try {
    const prefix = 'type ONLY_FOR_FORMAT = '
    const prettyType = await prettier.format(prefix + typeName, {
      ...prettierConfig,
      parser: 'typescript',
    })
    return prettyType.replace(prefix, '').trim()
  } catch {
    return typeName
  }
}

async function extractPropertiesOfTypeName(
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

      const defaultValue = property.getJsDocTags().filter((tag) => tag.name === 'default')[0]
        ?.text?.[0].text

      if (shouldIgnoreProperty(property)) {
        continue
      }
      const prettyType = await tryPrettier(typeName)
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
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      results[(typeStatement as any).name.getText()] = Object.fromEntries(
        Object.entries(properties)
          .sort(([aName], [bName]) => aName.localeCompare(bName))
          .sort(([, a], [, b]) => (a.isRequired === b.isRequired ? 0 : a.isRequired ? -1 : 1))
          .filter(([name]) => !name.endsWith('Context')),
      )
    }
  }

  // Only document types that are component props
  const foo = Object.fromEntries(
    Object.entries(results)
      .filter(([key]) => (!key.startsWith('Use') && key.endsWith('Props')) || key.endsWith('Emits'))
      .filter(([key]) => !key.endsWith('CreateToasterProps')),
  )

  return Object.keys(foo).length ? results : null
}

async function createTypeSearch(tsConfigPath: string, typeSearchOptions: TypeSearchOptions = {}) {
  const { shouldIgnoreProperty } = typeSearchOptions
  const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile)
  const { options } = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './dist')

  const files = globbySync('./dist/')
  const program = ts.createProgram(files, options)
  const sourceFiles = program.getSourceFiles()

  return async (searchTerm: Parameters<typeof extractPropertiesOfTypeName>[0]) => {
    const results: Record<string, TypeProperties> = {}
    for (const sourceFile of sourceFiles) {
      const typeInfo = await extractPropertiesOfTypeName(
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
  const project = new Project({
    useInMemoryFileSystem: true,
  })
  const sourceFile = project.createSourceFile('index.ts', fileContent)

  return sourceFile
    .forEachDescendantAsArray()
    .filter((node): node is ExportDeclaration => Node.isExportDeclaration(node))
    .flatMap((node) =>
      node
        .getNamedExports()
        .filter((namedExport) => namedExport.isTypeOnly())
        .map((namedExport) => namedExport.getAliasNode()?.getText() ?? namedExport.getName()),
    )
    .sort()
}

const extractTypesForFramework = async (framework: string) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const rootDir = dirname(findUpSync('bun.lockb')!)
  process.chdir(path.join(rootDir, 'packages', framework))

  const outDir = path.join(rootDir, 'website', 'src', 'content', 'types')
  const components = await globby(['src/components', 'src/providers'], {
    onlyDirectories: true,
    deep: 1,
  })

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

  const searchType = await createTypeSearch('tsconfig.json', {
    shouldIgnoreProperty,
  })

  const result = await Promise.all(
    Object.entries(componentExportMap).flatMap(async ([component, typeExports]) => {
      const resolvedTypeExports = await Promise.all(
        typeExports.map(async (type) => await searchType(type)),
      )
      return {
        component,
        typeExports: resolvedTypeExports
          .map((x) =>
            Object.fromEntries(
              Object.entries(x)
                .map((y) => [y[0].replace('Props', ''), Object.fromEntries(Object.entries(y[1]))])
                .map((x) => {
                  // Rename Type from e.g. AccordionItemContentProps to ItemContent
                  const shortName = (x[0] as string).replace(
                    voca.titleCase(component.split('/').pop()).replace('-', ''),
                    '',
                  )

                  const newName =
                    voca.isEmpty(shortName) ||
                    shortName === 'Emits' ||
                    shortName === 'Provider' ||
                    shortName === 'er'
                      ? x[0]
                      : shortName

                  return [newName, { props: Object.fromEntries(Object.entries(x[1])) }]
                })
                // @ts-expect-error
                .filter((x) => !x[0].endsWith('Base'))
                .filter((y) => Object.keys(y[1]).length !== 0),
            ),
          )
          .filter((value) => Object.keys(value).length !== 0)
          .reduce((acc, value) => {
            const [partName, partValue] = Object.entries(value)[0]
            const key = partName.replace('Emits', '')
            // @ts-expect-error
            const props = partValue.props

            if (partName.endsWith('Emits')) {
              acc[key] = { ...acc[key], emits: props }
            } else {
              acc[partName] = { ...acc[partName], props }
            }

            return acc
          }, {}),
      }
    }),
  )
  const regex = /forwardRef<\s*([^\s,]+)/

  Promise.all(
    result.map(async (foo) => {
      const { component, typeExports } = foo
      const files = await globby(path.join(component, '**/*.tsx'), { deep: 1 })

      const elementMap = files
        .map((file) => {
          const content = fs.readFileSync(file, 'utf8')
          const match = content.match(regex)
          const firstTypeParameter = match ? match[1] : null
          const name = kebabToPascal(path.parse(file).name.replace(path.basename(component), ''))
          if (firstTypeParameter && name) {
            return [name, firstTypeParameter]
          }
        })
        .filter(Boolean)
        .reduce((acc, value) => {
          if (value) {
            const [key, type] = value
            return { ...acc, [key]: type }
          }
          return acc
        }, {})

      const typeExportsWithElement = Object.entries(typeExports)
        .flatMap(([key, value]) => {
          // @ts-expect-error
          if (elementMap[key]) {
            // @ts-expect-error
            return { [key]: { ...value, element: elementMap[key] } }
          }
          return { [key]: value }
        })
        .filter(Boolean)
        .reduce((acc, value) => {
          return { ...acc, ...value }
        })

      fs.outputFileSync(
        path.join(outDir, framework, `${path.basename(component)}.types.json`),
        await prettier.format(JSON.stringify(typeExportsWithElement), {
          ...prettierConfig,
          parser: 'json',
        }),
      )
    }),
  )
}

const main = async () => {
  const framework = process.argv.slice(2)[0]
  console.log('Generating type docs for', framework)
  extractTypesForFramework(framework)
}

main().catch((err) => {
  const error = new Error(err)
  console.error(error.stack)
  process.exit(1)
})

function kebabToPascal(str: string) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}
