import { findUpSync } from 'find-up'
import fs from 'fs-extra'
import { globby } from 'globby'
import path, { dirname } from 'path'
import prettier from 'prettier'
import { Project, VariableDeclarationKind } from 'ts-morph'

const convertToEventName = (handlerName: string): string => {
  if (handlerName.startsWith('on')) {
    return handlerName.charAt(2).toLowerCase() + handlerName.slice(3)
  }
  return handlerName
}

const main = async () => {
  const prettierConfig = await prettier.resolveConfig('.')

  const root = dirname(findUpSync('pnpm-lock.yaml')!)
  process.chdir(path.join(root, 'packages', 'vue'))

  const indices = await globby(['src/*'], { onlyDirectories: true })

  await Promise.allSettled(
    indices
      .map((path) => path.split('/').pop() ?? '')
      .filter((index) => !['environment'].includes(index))
      .map(async (component) => {
        const project = new Project()
        const sourceFile = project.addSourceFileAtPath(
          `./node_modules/@zag-js/${component}/src/${component}.types.ts`,
        )

        const publicContextTypeAlias = sourceFile.getTypeAliasOrThrow('PublicContext')
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
                    const name = property.getName()
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

                      writer.writeLine(`${name}: {`)
                      writer.indent(() => {
                        writer.writeLine(`type: ${propType} as PropType<Context['${name}']>,`)
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
                .join(', ')}])`,
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
