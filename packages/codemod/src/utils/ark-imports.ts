import { Node } from 'ts-morph'
import type { JsxOpeningElement, JsxSelfClosingElement, SourceFile } from 'ts-morph'

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

const ARK_SOURCE = /^@ark-ui\//

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

export function arkLocalNames(sf: SourceFile, options: { crossFile?: boolean } = {}): Set<string> {
  const names = new Set<string>()

  for (const imp of sf.getImportDeclarations()) {
    if (!ARK_SOURCE.test(imp.getModuleSpecifierValue())) continue
    const def = imp.getDefaultImport()
    if (def) names.add(def.getText())
    const ns = imp.getNamespaceImport()
    if (ns) names.add(ns.getText())
    for (const spec of imp.getNamedImports()) {
      names.add(spec.getAliasNode()?.getText() ?? spec.getName())
    }
  }

  for (const decl of sf.getVariableDeclarations()) {
    const init = decl.getInitializer()
    if (!init) continue
    if (Node.isIdentifier(init) && names.has(init.getText())) {
      names.add(decl.getName())
      continue
    }
    if (Node.isPropertyAccessExpression(init) && names.has(getJsxBaseName(init))) {
      names.add(decl.getName())
    }
  }

  if (options.crossFile) {
    for (const imp of sf.getImportDeclarations()) {
      if (ARK_SOURCE.test(imp.getModuleSpecifierValue())) continue
      const target = imp.getModuleSpecifierSourceFile()
      if (!target) continue
      for (const spec of imp.getNamedImports()) {
        const local = spec.getAliasNode()?.getText() ?? spec.getName()
        if (names.has(local)) continue
        if (reExportsArk(target, spec.getName(), new Set(), 0)) names.add(local)
      }
    }
  }

  return names
}

const MAX_REEXPORT_DEPTH = 8

function importedNameIsArk(file: SourceFile, localName: string): boolean {
  for (const imp of file.getImportDeclarations()) {
    if (!ARK_SOURCE.test(imp.getModuleSpecifierValue())) continue
    if (imp.getDefaultImport()?.getText() === localName) return true
    if (imp.getNamespaceImport()?.getText() === localName) return true
    for (const spec of imp.getNamedImports()) {
      if ((spec.getAliasNode()?.getText() ?? spec.getName()) === localName) return true
    }
  }
  return false
}

function reExportsArk(file: SourceFile, exportName: string, visited: Set<string>, depth: number): boolean {
  if (depth > MAX_REEXPORT_DEPTH) return false
  const key = `${file.getFilePath()}::${exportName}`
  if (visited.has(key)) return false
  visited.add(key)

  for (const exp of file.getExportDeclarations()) {
    const spec = exp.getModuleSpecifierValue()
    const named = exp.getNamedExports()

    if (spec) {
      const targetIsArk = ARK_SOURCE.test(spec)
      let matched = false
      for (const n of named) {
        const exported = n.getAliasNode()?.getText() ?? n.getName()
        if (exported !== exportName) continue
        matched = true
        if (targetIsArk) return true
        const target = exp.getModuleSpecifierSourceFile()
        if (target && reExportsArk(target, n.getName(), visited, depth + 1)) return true
      }
      if (!matched && named.length === 0) {
        if (targetIsArk) return true
        const target = exp.getModuleSpecifierSourceFile()
        if (target && reExportsArk(target, exportName, visited, depth + 1)) return true
      }
    } else {
      for (const n of named) {
        const exported = n.getAliasNode()?.getText() ?? n.getName()
        if (exported === exportName && importedNameIsArk(file, n.getName())) return true
      }
    }
  }
  return false
}

export function isTrackedJsx(opening: JsxOpening, arkNames: Set<string>): boolean {
  return arkNames.has(getJsxBaseName(opening.getTagNameNode()))
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
