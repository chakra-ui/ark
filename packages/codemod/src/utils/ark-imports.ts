import { Node, ts } from 'ts-morph'
import type {
  ArrowFunction,
  ExportDeclaration,
  ImportDeclaration,
  FunctionDeclaration,
  FunctionExpression,
  JsxOpeningElement,
  JsxSelfClosingElement,
  SourceFile,
} from 'ts-morph'

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

const ARK_SOURCE = /^@ark-ui\//
const MAX_DEPTH = 12

const resolutionCache = new Map<string, string | null>()

function moduleSourceFile(decl: ImportDeclaration | ExportDeclaration): SourceFile | undefined {
  const specifier = decl.getModuleSpecifierValue()
  if (!specifier) return undefined
  const from = decl.getSourceFile()
  const project = from.getProject()
  const key = `${from.getFilePath()}\0${specifier}`
  let resolved = resolutionCache.get(key)
  if (resolved === undefined) {
    const result = ts.resolveModuleName(
      specifier,
      from.getFilePath(),
      project.getCompilerOptions(),
      project.getModuleResolutionHost(),
    )
    resolved = result.resolvedModule?.resolvedFileName ?? null
    resolutionCache.set(key, resolved)
  }
  if (!resolved) return undefined
  return project.getSourceFile(resolved) ?? project.addSourceFileAtPathIfExists(resolved)
}

export function getJsxBaseName(nameNode: Node): string {
  if (Node.isPropertyAccessExpression(nameNode)) {
    let current: Node = nameNode
    while (Node.isPropertyAccessExpression(current)) current = current.getExpression()
    return current.getText()
  }
  return nameNode.getText()
}

export function jsxBaseNameFromText(tag: string): string {
  return tag.split('.')[0]
}

export function isTrackedJsx(opening: JsxOpening, arkNames: Set<string>): boolean {
  return arkNames.has(getJsxBaseName(opening.getTagNameNode()))
}

export function arkLocalNames(sf: SourceFile, options: { crossFile?: boolean } = {}): Set<string> {
  const crossFile = options.crossFile ?? false
  const names = new Set<string>()

  const candidates = new Set<string>()
  for (const imp of sf.getImportDeclarations()) {
    const def = imp.getDefaultImport()
    if (def) candidates.add(def.getText())
    const ns = imp.getNamespaceImport()
    if (ns) candidates.add(ns.getText())
    for (const spec of imp.getNamedImports()) candidates.add(spec.getAliasNode()?.getText() ?? spec.getName())
  }
  for (const decl of sf.getVariableDeclarations()) candidates.add(decl.getName())
  for (const fn of sf.getFunctions()) {
    const name = fn.getName()
    if (name) candidates.add(name)
  }

  for (const name of candidates) {
    if (nameResolvesToArk(sf, name, crossFile, new Set(), 0)) names.add(name)
  }

  return names
}

const NONE: ReadonlySet<string> = new Set()

function nameResolvesToArk(
  file: SourceFile,
  name: string,
  crossFile: boolean,
  visited: Set<string>,
  depth: number,
): boolean {
  return arkOriginNames(file, name, crossFile, visited, depth).size > 0
}

export function arkComponentNames(sf: SourceFile, name: string, options: { crossFile?: boolean } = {}): Set<string> {
  return new Set(arkOriginNames(sf, name, options.crossFile ?? false, new Set(), 0))
}

export function jsxTagArkOrigins(sf: SourceFile, tag: string, options: { crossFile?: boolean } = {}): Set<string> {
  const segs = tag.split('.')
  if (options.crossFile && segs.length === 2) {
    const module = namespaceModule(sf, segs[0], new Set(), 0)
    if (module) return new Set(resolveInModule(module, segs[1]))
  }
  return arkComponentNames(sf, segs[0], options)
}

const arkTagCache = new WeakMap<SourceFile, Map<string, boolean>>()

export function isArkJsx(
  sf: SourceFile,
  opening: JsxOpening,
  arkNames: Set<string>,
  options: { crossFile?: boolean } = {},
) {
  if (!isTrackedJsx(opening, arkNames)) return false
  const tag = opening.getTagNameNode().getText()
  let cache = arkTagCache.get(sf)
  if (!cache) {
    cache = new Map()
    arkTagCache.set(sf, cache)
  }
  let isArk = cache.get(tag)
  if (isArk === undefined) {
    isArk = jsxTagArkOrigins(sf, tag, options).size > 0
    cache.set(tag, isArk)
  }
  return isArk
}

function namespaceModule(file: SourceFile, name: string, visited: Set<string>, depth: number): SourceFile | undefined {
  if (depth > MAX_DEPTH) return undefined
  const key = `${file.getFilePath()}::ns::${name}`
  if (visited.has(key)) return undefined
  visited.add(key)

  for (const imp of file.getImportDeclarations()) {
    if (ARK_SOURCE.test(imp.getModuleSpecifierValue())) continue
    if (imp.getNamespaceImport()?.getText() === name) return moduleSourceFile(imp)
    for (const spec of imp.getNamedImports()) {
      if ((spec.getAliasNode()?.getText() ?? spec.getName()) !== name) continue
      const target = moduleSourceFile(imp)
      const module = target && namespaceModule(target, spec.getName(), visited, depth + 1)
      if (module) return module
    }
  }

  for (const exp of file.getExportDeclarations()) {
    const source = exp.getModuleSpecifierValue()
    if (source && ARK_SOURCE.test(source)) continue
    const target = source ? moduleSourceFile(exp) : file
    if (!target) continue
    if (exp.getNamespaceExport()?.getName() === name) return target
    const named = exp.getNamedExports()
    for (const spec of named) {
      if ((spec.getAliasNode()?.getText() ?? spec.getName()) !== name) continue
      const module = namespaceModule(target, spec.getName(), visited, depth + 1)
      if (module) return module
    }
    if (source && named.length === 0 && !exp.getNamespaceExport()) {
      const module = namespaceModule(target, name, visited, depth + 1)
      if (module) return module
    }
  }

  return undefined
}

function arkOriginNames(
  file: SourceFile,
  name: string,
  crossFile: boolean,
  visited: Set<string>,
  depth: number,
): ReadonlySet<string> {
  if (depth > MAX_DEPTH) return NONE
  const key = `${file.getFilePath()}::${name}`
  if (visited.has(key)) return NONE
  visited.add(key)

  for (const imp of file.getImportDeclarations()) {
    const source = imp.getModuleSpecifierValue()
    const isArk = ARK_SOURCE.test(source)

    if (imp.getDefaultImport()?.getText() === name || imp.getNamespaceImport()?.getText() === name) {
      if (isArk) return new Set([name])
      const target = crossFile ? moduleSourceFile(imp) : undefined
      if (target && imp.getDefaultImport()?.getText() === name) {
        const names = defaultExportArkNames(target, visited, depth + 1)
        if (names.size > 0) return names
      }
      if (target && imp.getNamespaceImport()?.getText() === name) {
        const names = resolveModule(target)
        if (names.size > 0) return names
      }
    }
    for (const spec of imp.getNamedImports()) {
      const local = spec.getAliasNode()?.getText() ?? spec.getName()
      if (local !== name) continue
      if (isArk) return new Set([spec.getName()])
      if (!crossFile) continue
      const target = moduleSourceFile(imp)
      const names = target ? resolveInModule(target, spec.getName()) : NONE
      if (names.size > 0) return names
    }
  }

  const decl = file.getVariableDeclaration(name)
  if (decl) {
    const names = initializerArkNames(file, decl.getInitializer(), crossFile, visited, depth)
    if (names.size > 0) return names
  }

  const fn = file.getFunction(name)
  if (fn) {
    const names = returnedArkNames(file, fn, crossFile, visited, depth + 1)
    if (names.size > 0) return names
  }

  for (const exp of file.getExportDeclarations()) {
    const source = exp.getModuleSpecifierValue()
    const named = exp.getNamedExports()
    if (source) {
      const isArk = ARK_SOURCE.test(source)
      const namespace = exp.getNamespaceExport()
      if (namespace) {
        if (namespace.getName() !== name) continue
        if (isArk) return new Set([name])
        const target = crossFile ? moduleSourceFile(exp) : undefined
        const names = target ? resolveModule(target) : NONE
        if (names.size > 0) return names
        continue
      }
      let matched = false
      for (const spec of named) {
        if ((spec.getAliasNode()?.getText() ?? spec.getName()) !== name) continue
        matched = true
        if (isArk) return new Set([spec.getName()])
        if (!crossFile) continue
        const target = moduleSourceFile(exp)
        const names = target ? resolveInModule(target, spec.getName()) : NONE
        if (names.size > 0) return names
      }
      if (!matched && named.length === 0) {
        if (isArk) return new Set([name])
        if (crossFile) {
          const target = moduleSourceFile(exp)
          const names = target ? resolveInModule(target, name) : NONE
          if (names.size > 0) return names
        }
      }
    } else {
      for (const spec of named) {
        if ((spec.getAliasNode()?.getText() ?? spec.getName()) !== name) continue
        const names = arkOriginNames(file, spec.getName(), crossFile, visited, depth + 1)
        if (names.size > 0) return names
      }
    }
  }

  return NONE
}

const MODULE_KEY = '\0module'
const moduleCache = new WeakMap<SourceFile, Map<string, ReadonlySet<string>>>()

function cached(file: SourceFile, key: string, resolve: () => ReadonlySet<string>): ReadonlySet<string> {
  let entries = moduleCache.get(file)
  if (!entries) {
    entries = new Map()
    moduleCache.set(file, entries)
  }
  const hit = entries.get(key)
  if (hit) return hit
  entries.set(key, NONE)
  const result = resolve()
  entries.set(key, result)
  return result
}

function resolveInModule(file: SourceFile, name: string): ReadonlySet<string> {
  return cached(file, name, () => arkOriginNames(file, name, true, new Set(), 0))
}

function resolveModule(file: SourceFile): ReadonlySet<string> {
  return cached(file, MODULE_KEY, () => moduleArkNames(file, new Set(), 0))
}

function moduleArkNames(file: SourceFile, visited: Set<string>, depth: number): ReadonlySet<string> {
  if (depth > MAX_DEPTH) return NONE
  const names = new Set<string>()
  for (const exportName of file.getExportedDeclarations().keys()) {
    for (const origin of arkOriginNames(file, exportName, true, visited, depth)) names.add(origin)
  }
  return names
}

function initializerArkNames(
  file: SourceFile,
  node: Node | undefined,
  crossFile: boolean,
  visited: Set<string>,
  depth: number,
): ReadonlySet<string> {
  if (!node || depth > MAX_DEPTH) return NONE
  if (Node.isParenthesizedExpression(node)) {
    return initializerArkNames(file, node.getExpression(), crossFile, visited, depth)
  }
  if (Node.isIdentifier(node)) {
    return arkOriginNames(file, node.getText(), crossFile, visited, depth + 1)
  }
  if (Node.isPropertyAccessExpression(node)) {
    return arkOriginNames(file, getJsxBaseName(node), crossFile, visited, depth + 1)
  }
  if (Node.isCallExpression(node)) {
    return initializerArkNames(file, node.getArguments()[0], crossFile, visited, depth + 1)
  }
  if (Node.isArrowFunction(node) || Node.isFunctionExpression(node)) {
    return returnedArkNames(file, node, crossFile, visited, depth + 1)
  }
  return NONE
}

function returnedArkNames(
  file: SourceFile,
  fn: Node,
  crossFile: boolean,
  visited: Set<string>,
  depth: number,
): ReadonlySet<string> {
  for (const base of returnedJsxBaseNames(fn)) {
    const names = arkOriginNames(file, base, crossFile, visited, depth)
    if (names.size > 0) return names
  }
  return NONE
}

const isFunctionNode = (node: Node): node is ArrowFunction | FunctionExpression | FunctionDeclaration =>
  Node.isArrowFunction(node) || Node.isFunctionExpression(node) || Node.isFunctionDeclaration(node)

function returnedJsxBaseNames(fn: Node): string[] {
  const bases: string[] = []
  const push = (expr: Node | undefined) => {
    if (!expr) return
    let node: Node = expr
    while (Node.isParenthesizedExpression(node) || Node.isJsxExpression(node)) {
      const inner = node.getExpression()
      if (!inner) return
      node = inner
    }
    if (Node.isJsxElement(node)) bases.push(getJsxBaseName(node.getOpeningElement().getTagNameNode()))
    else if (Node.isJsxSelfClosingElement(node)) bases.push(getJsxBaseName(node.getTagNameNode()))
    else if (Node.isConditionalExpression(node)) {
      push(node.getWhenTrue())
      push(node.getWhenFalse())
    } else if (Node.isBinaryExpression(node)) {
      push(node.getLeft())
      push(node.getRight())
    } else if (Node.isJsxFragment(node)) {
      for (const child of node.getJsxChildren()) push(child)
    }
  }

  const body = isFunctionNode(fn) ? fn.getBody() : undefined
  if (body && !Node.isBlock(body)) {
    push(body)
  } else if (body) {
    body.forEachDescendant((node, traversal) => {
      if (isFunctionNode(node)) {
        traversal.skip()
        return
      }
      if (Node.isReturnStatement(node)) push(node.getExpression())
    })
  }
  return bases
}

function defaultExportArkNames(file: SourceFile, visited: Set<string>, depth: number): ReadonlySet<string> {
  if (depth > MAX_DEPTH) return NONE
  for (const assignment of file.getExportAssignments()) {
    if (assignment.isExportEquals()) continue
    const names = initializerArkNames(file, assignment.getExpression(), true, visited, depth)
    if (names.size > 0) return names
  }
  for (const fn of file.getFunctions()) {
    if (!fn.isDefaultExport()) continue
    const names = returnedArkNames(file, fn, true, visited, depth + 1)
    if (names.size > 0) return names
  }
  return NONE
}

export function arkLocalNamesFromSource(source: string): Set<string> {
  return new Set(arkImportOriginsFromSource(source).keys())
}

export function arkImportOriginsFromSource(source: string): Map<string, string> {
  const origins = new Map<string, string>()
  const importRe = /import\s+(?:type\s+)?([^'"]*?)\s+from\s*['"]@ark-ui\/[^'"]+['"]/g
  for (const match of source.matchAll(importRe)) {
    const clause = match[1]
    const named = clause.match(/\{([^}]*)\}/)
    if (named) {
      for (const part of named[1].split(',')) {
        const [imported, local] = part
          .replace(/^\s*type\s+/, '')
          .split(/\s+as\s+/)
          .map((n) => n.trim())
        if (imported) origins.set(local ?? imported, imported)
      }
    }
    const ns = clause.match(/\*\s+as\s+([\w$]+)/)
    if (ns) origins.set(ns[1], ns[1])
    const def = clause.replace(/\{[^}]*\}/, '').match(/^\s*([\w$]+)\s*,?/)
    if (def) origins.set(def[1], def[1])
  }
  return origins
}
