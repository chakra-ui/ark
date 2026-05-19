import path, { dirname } from 'node:path'
import { findUpSync } from 'find-up'
import fs from 'fs-extra'
import { globby } from 'globby'
import prettier from 'prettier'
import {
  type CallExpression,
  type ClassDeclaration,
  type PropertyDeclaration,
  type SourceFile,
  type Type,
  Node,
  Project,
  SyntaxKind,
} from 'ts-morph'

export type AngularPropKind = 'input' | 'required-input' | 'model' | 'output'

export interface AngularPropEntry {
  type: string
  isRequired: boolean
  defaultValue?: string
  description?: string
  kind: AngularPropKind
}

export interface AngularPartEntry {
  props: Record<string, AngularPropEntry>
}

export type AngularTypeDoc = Record<string, AngularPartEntry>

type PrettierConfig = Awaited<ReturnType<typeof prettier.resolveConfig>>

const prettierConfigs = new Map<string, PrettierConfig>()

async function getPrettierConfig(rootDir: string): Promise<NonNullable<PrettierConfig>> {
  const cached = prettierConfigs.get(rootDir)
  if (cached !== undefined) {
    return cached ?? {}
  }
  const config = await prettier.resolveConfig(path.join(rootDir, 'package.json'))
  prettierConfigs.set(rootDir, config)
  return config ?? {}
}

async function tryPrettier(typeName: string, rootDir: string): Promise<string> {
  try {
    const prettyType = await prettier.format(`type ONLY_FOR_FORMAT = ${typeName}`, {
      ...(await getPrettierConfig(rootDir)),
      parser: 'typescript',
    })
    return collapseTopLevelDoublePartial(
      prettyType
        .replace(/^type ONLY_FOR_FORMAT\s*=\s*/, '')
        .replace(/;\s*$/, '')
        .trim(),
    )
  } catch {
    return typeName
  }
}

function collapseTopLevelDoublePartial(typeName: string): string {
  // Alias rewriting can wrap an already-partial Zag type at the top level.
  let result = typeName
  while (/^Partial<\s*Partial<[\s\S]*>\s*>$/.test(result)) {
    result = result.replace(/^Partial<\s*Partial<([\s\S]*)>\s*>$/, 'Partial<$1>')
  }
  return result
}

function getRepoRoot(): string {
  // biome-ignore lint/style/noNonNullAssertion: bun.lock is always present at repo root
  return dirname(findUpSync('bun.lock')!)
}

function getAngularProject(rootDir: string): Project {
  const tsConfigFilePath = path.join(rootDir, 'packages', 'angular', 'tsconfig.json')
  return new Project({
    tsConfigFilePath,
    skipAddingFilesFromTsConfig: false,
  })
}

function isParseableSourceFile(filePath: string): boolean {
  const base = path.basename(filePath)
  if (base.endsWith('.spec.ts')) return false
  if (base.endsWith('.stories.ts')) return false
  if (base.endsWith('.anatomy.ts')) return false
  if (base.endsWith('.types.ts')) return false
  if (base === 'public-api.ts') return false
  const stem = base.replace(/\.ts$/, '')
  if (stem.startsWith('use-')) return false
  return true
}

function getDirectiveDecorator(classDeclaration: ClassDeclaration): CallExpression | undefined {
  for (const decorator of classDeclaration.getDecorators()) {
    const name = decorator.getName()
    if (name === 'Directive' || name === 'Component') {
      return decorator.getCallExpression()
    }
  }
  return undefined
}

function getDecoratorStringProperty(decoratorCall: CallExpression, propertyName: string): string | undefined {
  const arg = decoratorCall.getArguments()[0]
  if (!arg || !Node.isObjectLiteralExpression(arg)) return undefined
  const property = arg.getProperty(propertyName)
  if (!property || !Node.isPropertyAssignment(property)) return undefined
  const initializer = property.getInitializer()
  if (!initializer) return undefined
  if (Node.isStringLiteral(initializer) || Node.isNoSubstitutionTemplateLiteral(initializer)) {
    return initializer.getLiteralValue()
  }
  return undefined
}

function getCallOptionsStringProperty(
  callExpression: CallExpression,
  kind: AngularPropKind,
  propertyName: string,
): string | undefined {
  const optionsArg = callExpression.getArguments()[kind === 'required-input' || kind === 'output' ? 0 : 1]
  if (!optionsArg || !Node.isObjectLiteralExpression(optionsArg)) return undefined
  const property = optionsArg.getProperty(propertyName)
  if (!property || !Node.isPropertyAssignment(property)) return undefined
  const initializer = property.getInitializer()
  if (!initializer) return undefined
  if (Node.isStringLiteral(initializer) || Node.isNoSubstitutionTemplateLiteral(initializer)) {
    return initializer.getLiteralValue()
  }
  return undefined
}

function pascalCaseComponent(component: string): string {
  return component
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

const partNameOverrides: Record<string, Record<string, string>> = {
  toast: {
    ArkToaster: 'Toaster',
  },
}

function derivePartName(classDeclaration: ClassDeclaration, component: string): string | undefined {
  const className = classDeclaration.getName()
  if (!className) return undefined
  const componentPascal = pascalCaseComponent(component)
  const arkPrefix = `Ark${componentPascal}`
  const override = partNameOverrides[component]?.[className]
  if (override) return override

  const decoratorCall = getDirectiveDecorator(classDeclaration)
  const exportAs = decoratorCall ? getDecoratorStringProperty(decoratorCall, 'exportAs') : undefined

  if (exportAs === `ark${componentPascal}` || className === `${arkPrefix}Root` || className === arkPrefix) {
    return 'Root'
  }
  if (exportAs === `ark${componentPascal}RootProvider` || className.endsWith('RootProvider')) {
    return 'RootProvider'
  }

  if (className.startsWith(arkPrefix)) {
    return className.slice(arkPrefix.length)
  }
  return undefined
}

function getCalleeName(callExpression: CallExpression): string {
  const expression = callExpression.getExpression()
  return expression.getText()
}

function callKindFromCallee(callee: string): AngularPropKind | undefined {
  if (callee === 'input') return 'input'
  if (callee === 'input.required') return 'required-input'
  if (callee === 'model') return 'model'
  if (callee === 'output') return 'output'
  return undefined
}

function getPropertyCallInitializer(property: PropertyDeclaration): CallExpression | undefined {
  const initializer = property.getInitializer()
  if (!initializer || !Node.isCallExpression(initializer)) return undefined
  return initializer
}

function isLiteralArg(node: Node): boolean {
  if (Node.isStringLiteral(node)) return true
  if (Node.isNoSubstitutionTemplateLiteral(node)) return true
  if (Node.isNumericLiteral(node)) return true
  if (node.getKind() === SyntaxKind.TrueKeyword) return true
  if (node.getKind() === SyntaxKind.FalseKeyword) return true
  if (Node.isNullLiteral(node)) return true
  return false
}

function buildNamespaceAliasMap(sourceFile: SourceFile): Map<string, string> {
  const result = new Map<string, string>()
  const namespaceImports = new Map<string, string>()
  for (const decl of sourceFile.getImportDeclarations()) {
    const ns = decl.getNamespaceImport()
    if (ns) {
      namespaceImports.set(ns.getText(), decl.getModuleSpecifierValue())
    }
  }
  if (namespaceImports.size === 0) return result

  for (const decl of sourceFile.getImportDeclarations()) {
    const moduleSpec = decl.getModuleSpecifierValue()
    if (!moduleSpec.startsWith('.')) continue
    const resolvedSourceFile = decl.getModuleSpecifierSourceFile()
    if (!resolvedSourceFile) continue
    for (const named of decl.getNamedImports()) {
      const localName = named.getAliasNode()?.getText() ?? named.getNameNode().getText()
      const originalName = named.getNameNode().getText()
      const reExport = findReExport(resolvedSourceFile, originalName)
      if (!reExport) continue
      const upstreamModule = reExport.module
      const upstreamName = reExport.name
      for (const [nsLocal, nsModule] of namespaceImports.entries()) {
        if (nsModule === upstreamModule) {
          result.set(`${nsLocal}.${upstreamName}`, localName)
        }
      }
    }
  }
  return result
}

function findReExport(sourceFile: SourceFile, exportedName: string): { module: string; name: string } | undefined {
  for (const decl of sourceFile.getExportDeclarations()) {
    const moduleSpec = decl.getModuleSpecifierValue()
    if (!moduleSpec) continue
    for (const named of decl.getNamedExports()) {
      const alias = named.getAliasNode()?.getText()
      const original = named.getNameNode().getText()
      const localName = alias ?? original
      if (localName === exportedName) {
        return { module: moduleSpec, name: original }
      }
    }
  }
  return undefined
}

function applyAliasMap(typeText: string, aliasMap: Map<string, string>): string {
  if (aliasMap.size === 0) return typeText
  let result = typeText
  for (const [qualified, local] of aliasMap.entries()) {
    const escaped = qualified.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    result = result.replace(new RegExp(`\\b${escaped}\\b`, 'g'), local)
  }
  return result
}

function getTypeTextWithoutUndefined(type: Type, property: PropertyDeclaration): string {
  const unionTypes = type.getUnionTypes()
  if (unionTypes.length === 0) return type.getText(property)

  // Undefined means "input omitted"; null is a meaningful value and should stay visible in docs.
  const withoutUndefined = unionTypes.filter((unionType) => !unionType.isUndefined())
  if (withoutUndefined.length === unionTypes.length || withoutUndefined.length === 0) {
    return type.getText(property)
  }

  return withoutUndefined
    .map((unionType) => {
      const text = unionType.getText(property)
      return text.startsWith('() =>') ? `(${text})` : text
    })
    .join(' | ')
}

function normalizeTypeText(typeText: string): string {
  const parts = typeText
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)
  if (parts.includes('false') && parts.includes('true')) {
    const normalized = parts.map((part) => (part === 'false' || part === 'true' ? 'boolean' : part))
    return [...new Set(normalized)].join(' | ')
  }
  return typeText
}

function getDescription(property: PropertyDeclaration): string | undefined {
  const docs = property.getJsDocs()
  if (docs.length === 0) return undefined
  const text = docs
    .map((doc) => doc.getDescription())
    .join('\n')
    .trim()
  return text.length > 0 ? text : undefined
}

async function extractPropEntry(
  property: PropertyDeclaration,
  classDeclaration: ClassDeclaration,
  sourceFile: SourceFile,
  aliasMap: Map<string, string>,
  rootDir: string,
): Promise<{ name: string; entry: AngularPropEntry } | undefined> {
  if (!property.hasModifier(SyntaxKind.ReadonlyKeyword)) return undefined
  if (property.hasModifier(SyntaxKind.PrivateKeyword)) return undefined
  if (property.hasModifier(SyntaxKind.ProtectedKeyword)) return undefined

  const callExpression = getPropertyCallInitializer(property)
  if (!callExpression) return undefined

  const callee = getCalleeName(callExpression)
  const kind = callKindFromCallee(callee)
  if (!kind) return undefined

  const fieldName = property.getName()
  if (!fieldName) {
    throw new Error(
      `Missing field name in class ${classDeclaration.getName() ?? '<anonymous>'} (${sourceFile.getFilePath()})`,
    )
  }

  const propertyType = property.getType()
  const innerType = propertyType.getTypeArguments()[0] ?? callExpression.getTypeArguments()[0]?.getType()
  if (!innerType) {
    throw new Error(`Could not resolve inner type for ${property.getName()} (${sourceFile.getFilePath()})`)
  }
  const rawType = getTypeTextWithoutUndefined(innerType, property)
  const aliased = applyAliasMap(rawType, aliasMap)
  const type = normalizeTypeText(await tryPrettier(aliased, rootDir))
  const name = getCallOptionsStringProperty(callExpression, kind, 'alias') ?? fieldName

  const isRequired = kind === 'required-input'

  const entry: AngularPropEntry = {
    type,
    isRequired,
    kind,
  }

  if (kind === 'input' || kind === 'model') {
    const firstArg = callExpression.getArguments()[0]
    if (firstArg && isLiteralArg(firstArg)) {
      entry.defaultValue = firstArg.getText()
    }
  }

  const description = getDescription(property)
  if (description !== undefined) {
    entry.description = description
  }

  return { name, entry }
}

function sortProps(props: Record<string, AngularPropEntry>): Record<string, AngularPropEntry> {
  return Object.fromEntries(
    Object.entries(props)
      .sort(([aName], [bName]) => aName.localeCompare(bName))
      .sort(([, a], [, b]) => (a.isRequired === b.isRequired ? 0 : a.isRequired ? -1 : 1)),
  )
}

function getPublicApiExportOrder(project: Project, componentDir: string): Map<string, number> {
  const publicApiPath = path.join(componentDir, 'public-api.ts')
  const publicApi = project.getSourceFile(publicApiPath)
  const orderIndex = new Map<string, number>()
  if (!publicApi) return orderIndex

  let index = 0
  for (const decl of publicApi.getExportDeclarations()) {
    for (const named of decl.getNamedExports()) {
      const name = named.getAliasNode()?.getText() ?? named.getName()
      if (!orderIndex.has(name)) {
        orderIndex.set(name, index++)
      }
    }
  }
  return orderIndex
}

function collectClassesForComponent(project: Project, componentDir: string): ClassDeclaration[] {
  const orderIndex = getPublicApiExportOrder(project, componentDir)

  const files = project.getSourceFiles().filter((sf) => {
    const filePath = sf.getFilePath()
    if (path.dirname(filePath) !== componentDir) return false
    return isParseableSourceFile(filePath)
  })

  const classes: ClassDeclaration[] = []
  for (const sourceFile of files) {
    for (const classDeclaration of sourceFile.getClasses()) {
      if (getDirectiveDecorator(classDeclaration)) {
        classes.push(classDeclaration)
      }
    }
  }

  return classes.sort((a, b) => {
    const aIdx = orderIndex.get(a.getName() ?? '') ?? Number.MAX_SAFE_INTEGER
    const bIdx = orderIndex.get(b.getName() ?? '') ?? Number.MAX_SAFE_INTEGER
    return aIdx - bIdx
  })
}

function resolveComponentDir(rootDir: string, component: string): string {
  const topLevel = path.join(rootDir, 'packages', 'angular', component)
  const nested = path.join(rootDir, 'packages', 'angular', 'src', component)

  const hasTopLevel = fs.existsSync(path.join(topLevel, 'public-api.ts'))
  const hasNested = fs.existsSync(path.join(nested, 'public-api.ts'))

  if (hasTopLevel && hasNested) {
    throw new Error(
      `Angular component "${component}" exists in both packages/angular/${component}/public-api.ts and packages/angular/src/${component}/public-api.ts`,
    )
  }
  if (hasNested) return nested
  if (hasTopLevel) return topLevel
  throw new Error(`Angular component "${component}" not found in packages/angular/ or packages/angular/src/`)
}

export async function generateAngularTypeDoc(component: string, rootDir?: string): Promise<AngularTypeDoc> {
  const root = rootDir ?? getRepoRoot()
  const componentDir = resolveComponentDir(root, component)
  const project = getAngularProject(root)
  const classes = collectClassesForComponent(project, componentDir)

  // The generator intentionally does NOT emit `tag` for Angular parts. No code in
  // website/src/ reads `.tag` from Types entries (verified by grep).
  const result: AngularTypeDoc = {}
  for (const classDeclaration of classes) {
    const partName = derivePartName(classDeclaration, component)
    if (!partName) {
      throw new Error(
        `Could not derive part name for class ${classDeclaration.getName() ?? '<anonymous>'} in ${classDeclaration
          .getSourceFile()
          .getFilePath()}`,
      )
    }

    const props: Record<string, AngularPropEntry> = {}
    const aliasMap = buildNamespaceAliasMap(classDeclaration.getSourceFile())
    for (const property of classDeclaration.getProperties()) {
      const extracted = await extractPropEntry(
        property,
        classDeclaration,
        classDeclaration.getSourceFile(),
        aliasMap,
        root,
      )
      if (extracted) {
        props[extracted.name] = extracted.entry
      }
    }

    result[partName] = { props: sortProps(props) }
  }

  return result
}

function isAngularComponentDir(componentRoot: string, component: string): boolean {
  return fs.existsSync(path.join(componentRoot, component, `${component}-root.ts`))
}

const excludedAngularSrcTypeDocDirs = new Set(['_zag', 'internal', 'providers'])

function listAngularExportedComponents(rootDir: string): Set<string> {
  const packageJsonPath = path.join(rootDir, 'packages', 'angular', 'package.json')
  if (!fs.existsSync(packageJsonPath)) return new Set()

  const pkg = fs.readJsonSync(packageJsonPath) as { exports?: Record<string, unknown> }
  return new Set(
    Object.keys(pkg.exports ?? {})
      .filter((key) => key.startsWith('./') && key !== './package.json' && !key.startsWith('./src/'))
      .map((key) => key.slice(2)),
  )
}

export async function listAngularComponents(rootDir: string): Promise<string[]> {
  const angularRoot = path.join(rootDir, 'packages', 'angular')
  const components = new Set<string>()
  const exportedComponents = listAngularExportedComponents(rootDir)

  const legacyPublicApis = await globby('*/public-api.ts', {
    cwd: angularRoot,
  })
  for (const publicApi of legacyPublicApis) {
    const component = publicApi.split('/')[0]
    if (component !== 'src' && isAngularComponentDir(angularRoot, component)) {
      components.add(component)
    }
  }

  const nestedRoot = path.join(angularRoot, 'src')
  const nestedPublicApis = fs.existsSync(nestedRoot) ? await globby('*/public-api.ts', { cwd: nestedRoot }) : []
  for (const publicApi of nestedPublicApis) {
    const component = publicApi.split('/')[0]
    if (exportedComponents.has(component) && !excludedAngularSrcTypeDocDirs.has(component)) {
      components.add(component)
    }
  }

  return Array.from(components).sort()
}

export async function main(): Promise<void> {
  const rootDir = getRepoRoot()
  const outDir = path.join(rootDir, 'website', 'src', 'content', 'types', 'angular')
  const components = await listAngularComponents(rootDir)

  for (const component of components) {
    const typeDoc = await generateAngularTypeDoc(component, rootDir)
    const formatted = `${JSON.stringify(typeDoc, null, 2)}\n`
    fs.outputFileSync(path.join(outDir, `${component}.types.json`), formatted)
    console.log(`Generated angular type docs for ${component}`)
  }
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.stack : err)
    process.exit(1)
  })
}
