import { findUpSync } from 'find-up'
import fs from 'fs-extra'
import path, { dirname } from 'path'
import prettier from 'prettier'
import { Project, VariableDeclarationKind } from 'ts-morph'

const convertToEventName = (value: string): string => {
  return value
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .slice(3)
    .toLowerCase()
}

const main = async () => {
  const prettierConfig = await prettier.resolveConfig('.')

  const root = dirname(findUpSync('pnpm-lock.yaml')!)
  process.chdir(path.join(root, 'packages', 'frameworks', 'vue'))

  // const indices = await globby(['src/*'], { onlyDirectories: true })
  const indices = ['clipboard']

  await Promise.all(
    indices
      .map((path) => path.split('/').pop() ?? '')
      .filter((index) => !['environment'].includes(index))
      .map(async (component) => {
        const project = new Project()
        const sourceFile = project.addSourceFileAtPath(
          `./node_modules/@zag-js/${component}/src/${component}.types.ts`,
        )

        const publicContextTypeAlias = sourceFile.getTypeAliasOrThrow('UserDefinedContext')
        const publicContextType = publicContextTypeAlias.getType()
        const publicContextProperties = publicContextType
          .getProperties()
          .sort((a, b) => (a.getName() > b.getName() ? 1 : -1))

        const props = publicContextProperties.filter(
          (property) => !property.getName().startsWith('on'),
        )
        const emits = publicContextProperties.filter((property) =>
          property.getName().startsWith('on'),
        )

        const outputFile = project.createSourceFile(`./props.ts`, undefined, {
          overwrite: true,
        })

        outputFile.addImportDeclaration({
          namedImports: ['PropType'],
          moduleSpecifier: 'vue',
          isTypeOnly: true,
        })

        outputFile.addImportDeclaration({
          namedImports: ['Context'],
          moduleSpecifier: `@zag-js/${component}`,
          isTypeOnly: true,
        })

        outputFile.addImportDeclaration({
          namedImports: ['declareEmits'],
          moduleSpecifier: '../utils',
        })

        outputFile.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            {
              name: 'props',
              initializer: (writer) => {
                writer.block(() => {
                  for (const property of props) {
                    const name = property.getName() === 'value' ? 'modelValue' : property.getName()
                    if (!name.startsWith('on')) {
                      const type = property.getTypeAtLocation(publicContextTypeAlias)

                      const isFunction =
                        type.getText(publicContextTypeAlias).includes('=>') &&
                        !type.getText(publicContextTypeAlias).startsWith('{')

                      const propType = isFunction
                        ? 'Function'
                        : type.isBoolean()
                          ? 'Boolean'
                          : type.isString() || type.isUnion()
                            ? 'String'
                            : type.isNumber()
                              ? 'Number'
                              : type.isArray()
                                ? 'Array'
                                : 'Object'

                      writer.writeLine(`'${name}': {`)
                      writer.indent(() => {
                        writer.writeLine(
                          `type: ${propType} as PropType<Context['${property.getName()}']>,`,
                        )
                        if (propType === 'Boolean') {
                          writer.writeLine(`default: undefined,`)
                        }
                      })
                      writer.writeLine('},')
                    }
                  }
                })
              },
            },
          ],
        })

        outputFile.addVariableStatement({
          declarationKind: VariableDeclarationKind.Const,
          isExported: true,
          declarations: [
            {
              name: 'emits',
              initializer: `declareEmits([${emits
                .map((property) => `'${convertToEventName(property.getName())}'`)
                .join(', ')
                .concat(
                  props.some((property) => property.getName() === 'value')
                    ? ', "update:modelValue"'
                    : '',
                )}])`,
            },
          ],
        })

        fs.outputFile(
          `./src/${component}/${component}.props.ts`,
          await prettier.format(outputFile.getText(), {
            ...prettierConfig,
            plugins: ['prettier-plugin-organize-imports'],
            parser: 'typescript',
          }),
        )
      }),
  )
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
