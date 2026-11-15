import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { parse, resolve } from 'node:path'
import { globby } from 'globby'
import prettier from 'prettier'
import {
  type ImportDeclarationStructure,
  Node,
  type OptionalKind,
  Project,
  type PropertySignatureStructure,
} from 'ts-morph'
import { chain } from 'voca'

const extractTypes = (component: string) => {
  console.log('Generating props for', component)

  const project = new Project()
  const sourceFile = project.addSourceFileAtPath(`../packages/vue/src/components/${component}/use-${component}.ts`)
  const zagImport = sourceFile
    .getImportDeclarations()
    .find((decl) => decl.getModuleSpecifierValue().startsWith('@zag-js/') && decl.getNamespaceImport())
  if (!zagImport) {
    console.log('Skipping', component, '(no zag namespace import)')
    return false
  }
  const zagModule = zagImport.getModuleSpecifierValue()
  const zagNamespace = zagImport.getNamespaceImportOrThrow().getText()

  const existing = readExistingMembers(project, component)
  if (existing.otherExports) {
    console.log('Skipping', component, '(types file has other exports, maintained by hand)')
    return false
  }
  if (existing.generic) {
    console.log('Skipping', component, '(generic RootProps, maintained by hand)')
    return false
  }
  const outputFile = project.createSourceFile(`../packages/vue/src/components/${component}/${component}.types.ts`, '', {
    overwrite: true,
  })

  const hookProps = sourceFile.getInterface(`Use${chain(component).camelCase().capitalize().value()}Props`)
  if (!hookProps) {
    console.log('Skipping', component, '(no hook props interface)')
    return false
  }

  const propperties = hookProps
    .getType()
    .getProperties()
    .sort((a, b) => (a.getName() > b.getName() ? 1 : -1))

  const props: OptionalKind<PropertySignatureStructure>[] = propperties
    .filter((property) => !property.getName().startsWith('on'))
    .filter((property) => {
      if (['checkbox', 'switch'].includes(component)) {
        return true
      }
      return !['value'].includes(property.getName())
    })
    .map((property) => {
      const comment = property
        .getDeclarations()
        .flatMap((declaration) => declaration.getLeadingCommentRanges().map((comment) => `${comment.getText()}\n`))
      return {
        name: escapePropertyName(property.getName()),
        // optional props already allow undefined; match the hand-written files
        type: property
          .getTypeAtLocation(sourceFile)
          .getText(sourceFile)
          .replace(/ \| undefined$/, '')
          .replace(IMPORT_PATH_RE, "import('$1')"),
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
        .flatMap((declaration) => declaration.getLeadingCommentRanges().map((comment) => comment.getText())),
      type: property
        .getTypeAtLocation(sourceFile)
        // callbacks are typed `fn | undefined`, which has no call signatures until undefined is removed
        .getNonNullableType()
        .getCallSignatures()
        .flatMap((signature) =>
          signature
            .getParameters()
            .map((param) => [
              param.getName(),
              param.getTypeAtLocation(sourceFile).getText(sourceFile).replace(IMPORT_PATH_RE, "import('$1')"),
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

  // hand-written members may reference types from the old imports; organizeImports drops the unused ones
  outputFile.addImportDeclarations(existing.imports.filter((decl) => decl.namespaceImport !== zagNamespace))
  outputFile.addImportDeclaration({
    moduleSpecifier: zagModule,
    namespaceImport: zagNamespace,
    isTypeOnly: true,
  })

  // keep members the hook doesn't produce, such as presence emits or extra v-model events
  const propNames = new Set(props.map((prop) => unquote(prop.name)))
  const extraProps = existing.props.filter((member) => !propNames.has(member.name))
  const emitNames = new Set(emits.map((emit) => emit.name))
  const extraEmits = existing.emits.filter((member) => !emitNames.has(member.name))

  outputFile.addInterface({
    name: 'RootProps',
    isExported: true,
    properties: props,
  })
  const rootProps = outputFile.getInterfaceOrThrow('RootProps')
  for (const member of extraProps) rootProps.addMember(member.text)

  outputFile.addTypeAlias({
    name: 'RootEmits',
    isExported: true,
    type: `{ ${emits
      .map(
        (emit) =>
          `\n${emit.comment}
        ${escapePropertyName(emit.name)}: [${emit.type.map(([key, value]) => `${key}: ${value}`)}]`,
      )
      .concat(extraEmits.map((member) => `\n${member.text}`))
      .join('; ')}}`,
  })
  outputFile.organizeImports()
  outputFile.saveSync()
  return true
}

const typesPath = (component: string) => resolve(`../packages/vue/src/components/${component}/${component}.types.ts`)

const generate = async (component: string) => {
  if (extractTypes(component)) await formatFile(typesPath(component))
}

const main = async () => {
  const component = process.argv.slice(2)[0]

  if (component) {
    return generate(component)
  }

  console.log('Generating props for all components')
  const components = await globby(['../packages/vue/src/components/*'], {
    onlyDirectories: true,
    deep: 1,
  })
  // only components with a machine hook and a generated types file
  const generated = components
    .map((dir) => parse(dir).base)
    .filter(
      (name) => existsSync(`../packages/vue/src/components/${name}/use-${name}.ts`) && existsSync(typesPath(name)),
    )
    .sort()

  for (const name of generated) {
    await generate(name)
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})

async function formatFile(filePath: string) {
  const config = await prettier.resolveConfig(resolve(__dirname, '../.prettierrc'))
  const content = readFileSync(filePath, 'utf-8')
  const formatted = await prettier.format(content, {
    ...config,
    parser: 'typescript',
  })
  writeFileSync(filePath, formatted)
}

// types zag doesn't re-export print as import('<node_modules path>/@zag-js/x'); point them at the package
const IMPORT_PATH_RE = /import\(["'][^"']*?node_modules\/(@zag-js\/[a-z-]+)["']\)/g

interface ExistingMember {
  name: string
  text: string
}

function readExistingMembers(project: Project, component: string) {
  const path = `../packages/vue/src/components/${component}/${component}.types.ts`
  const result = {
    props: [] as ExistingMember[],
    emits: [] as ExistingMember[],
    imports: [] as ImportDeclarationStructure[],
    generic: false,
    otherExports: false,
  }
  if (!existsSync(path)) return result
  const file = project.addSourceFileAtPath(path)
  const toMember = (member: { getText(includeJsDoc?: boolean): string }) => {
    const text = member.getText(true)
    const name = unquote(
      text
        .replace(/\/\*\*[\s\S]*?\*\/\s*/, '')
        .split(/\??:\s/)[0]
        .trim(),
    )
    return { name, text }
  }
  result.imports = file.getImportDeclarations().map((decl) => decl.getStructure())
  result.otherExports = [...file.getExportedDeclarations().keys()].some(
    (name) => name !== 'RootProps' && name !== 'RootEmits',
  )
  const rootProps = file.getInterface('RootProps')
  result.generic = (rootProps?.getTypeParameters().length ?? 0) > 0
  result.props = rootProps?.getMembers().map(toMember) ?? []
  const emitsType = file.getTypeAlias('RootEmits')?.getTypeNode()
  if (emitsType && Node.isTypeLiteral(emitsType)) result.emits = emitsType.getMembers().map(toMember)
  project.removeSourceFile(file)
  return result
}

const unquote = (name: string) => name.replace(/^['"]|['"]$/g, '')

function escapePropertyName(name: string): string {
  if (/[^a-zA-Z0-9_]/.test(name)) {
    return `"${name}"` // aria-label -> 'aria-label'
  }
  return name
}
