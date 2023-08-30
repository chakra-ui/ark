import { findUpSync } from 'find-up'
import fs from 'fs-extra'
import { globby } from 'globby'
import path, { dirname } from 'path'
import prettier from 'prettier'
import { Project, VariableDeclarationKind } from 'ts-morph'

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

        outputFile.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            {
              name: 'props',
              initializer: (writer) => {
                writer.block(() => {
                  for (const property of publicContextProperties) {
                    const name = property.getName()
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
                      : type.isObject()
                      ? 'Object'
                      : 'Any'

                    writer.writeLine(`${name}: {`)
                    writer.indent(() => {
                      writer.writeLine(`type: ${propType} as PropType<Context['${name}']>,`)
                    })
                    writer.writeLine('},')
                  }
                })
              },
            },
          ],
        })
        fs.outputFile(
          `./src/${component}/${component}.props.ts`,
          await prettier.format(outputFile.getText(), { ...prettierConfig, parser: 'typescript' }),
        )
      }),
  )
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
