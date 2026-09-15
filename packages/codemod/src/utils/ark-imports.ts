import { Node } from 'ts-morph'
import type {
  ArrowFunction,
  FunctionDeclaration,
  FunctionExpression,
  JsxOpeningElement,
  JsxSelfClosingElement,
  SourceFile,
} from 'ts-morph'

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

const ARK_SOURCE = /^@ark-ui\//
const MAX_DEPTH = 12

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

function nameResolvesToArk(
  file: SourceFile,
  name: string,
  crossFile: boolean,
  visited: Set<string>,
  depth: number,
): boolean {
  if (depth > MAX_DEPTH) return false
  const key = `${file.getFilePath()}::${name}`
  if (visited.has(key)) return false
  visited.add(key)

  for (const imp of file.getImportDeclarations()) {
    const source = imp.getModuleSpecifierValue()
    const isArk = ARK_SOURCE.test(source)

    if (imp.getDefaultImport()?.getText() === name || imp.getNamespaceImport()?.getText() === name) {
      if (isArk) return true
      if (crossFile && imp.getDefaultImport()?.getText() === name) {
        const target = imp.getModuleSpecifierSourceFile()
        if (target && defaultExportResolvesToArk(target, crossFile, visited, depth + 1)) return true
      }
    }
    for (const spec of imp.getNamedImports()) {
      const local = spec.getAliasNode()?.getText() ?? spec.getName()
      if (local !== name) continue
      if (isArk) return true
      if (!crossFile) continue
      const target = imp.getModuleSpecifierSourceFile()
      if (target && nameResolvesToArk(target, spec.getName(), crossFile, visited, depth + 1)) return true
    }
  }

  const decl = file.getVariableDeclaration(name)
  if (decl && initializerIsArk(file, decl.getInitializer(), crossFile, visited, depth)) return true

  const fn = file.getFunction(name)
  if (fn && returnedJsxBaseNames(fn).some((base) => nameResolvesToArk(file, base, crossFile, visited, depth + 1)))
    return true

  for (const exp of file.getExportDeclarations()) {
    const source = exp.getModuleSpecifierValue()
    const named = exp.getNamedExports()
    if (source) {
      const isArk = ARK_SOURCE.test(source)
      let matched = false
      for (const spec of named) {
        if ((spec.getAliasNode()?.getText() ?? spec.getName()) !== name) continue
        matched = true
        if (isArk) return true
        if (!crossFile) continue
        const target = exp.getModuleSpecifierSourceFile()
        if (target && nameResolvesToArk(target, spec.getName(), crossFile, visited, depth + 1)) return true
      }
      if (!matched && named.length === 0) {
        if (isArk) return true
        if (crossFile) {
          const target = exp.getModuleSpecifierSourceFile()
          if (target && nameResolvesToArk(target, name, crossFile, visited, depth + 1)) return true
        }
      }
    } else {
      for (const spec of named) {
        if ((spec.getAliasNode()?.getText() ?? spec.getName()) !== name) continue
        if (nameResolvesToArk(file, spec.getName(), crossFile, visited, depth + 1)) return true
      }
    }
  }

  return false
}

function initializerIsArk(
  file: SourceFile,
  node: Node | undefined,
  crossFile: boolean,
  visited: Set<string>,
  depth: number,
): boolean {
  if (!node || depth > MAX_DEPTH) return false
  if (Node.isParenthesizedExpression(node)) {
    return initializerIsArk(file, node.getExpression(), crossFile, visited, depth)
  }
  if (Node.isIdentifier(node)) {
    return nameResolvesToArk(file, node.getText(), crossFile, visited, depth + 1)
  }
  if (Node.isPropertyAccessExpression(node)) {
    return nameResolvesToArk(file, getJsxBaseName(node), crossFile, visited, depth + 1)
  }
  if (Node.isCallExpression(node)) {
    return initializerIsArk(file, node.getArguments()[0], crossFile, visited, depth + 1)
  }
  if (Node.isArrowFunction(node) || Node.isFunctionExpression(node)) {
    return returnedJsxBaseNames(node).some((base) => nameResolvesToArk(file, base, crossFile, visited, depth + 1))
  }
  return false
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

function defaultExportResolvesToArk(
  file: SourceFile,
  crossFile: boolean,
  visited: Set<string>,
  depth: number,
): boolean {
  if (depth > MAX_DEPTH) return false
  for (const assignment of file.getExportAssignments()) {
    if (assignment.isExportEquals()) continue
    if (initializerIsArk(file, assignment.getExpression(), crossFile, visited, depth)) return true
  }
  for (const fn of file.getFunctions()) {
    if (
      fn.isDefaultExport() &&
      returnedJsxBaseNames(fn).some((base) => nameResolvesToArk(file, base, crossFile, visited, depth + 1))
    )
      return true
  }
  return false
}

export function arkLocalNamesFromSource(source: string): Set<string> {
  const names = new Set<string>()
  const importRe = /import\s+(?:type\s+)?([^'"]*?)\s+from\s*['"]@ark-ui\/[^'"]+['"]/g
  for (const match of source.matchAll(importRe)) {
    const clause = match[1]
    const named = clause.match(/\{([^}]*)\}/)
    if (named) {
      for (const part of named[1].split(',')) {
        const local = part
          .replace(/^\s*type\s+/, '')
          .split(/\s+as\s+/)
          .pop()
          ?.trim()
        if (local) names.add(local)
      }
    }
    const ns = clause.match(/\*\s+as\s+([\w$]+)/)
    if (ns) names.add(ns[1])
    const def = clause.replace(/\{[^}]*\}/, '').match(/^\s*([\w$]+)\s*,?/)
    if (def) names.add(def[1])
  }
  return names
}
