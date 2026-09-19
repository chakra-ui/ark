import { Node, SyntaxKind } from 'ts-morph'
import type { JsxOpeningElement, JsxSelfClosingElement } from 'ts-morph'
import type { TransformOptions, TransformResult } from '../../types.ts'
import { arkLocalNames, isTrackedJsx } from '../../utils/ark-imports.ts'
import { createTransformSourceFile } from '../../utils/ts-project.ts'

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

export interface PropRule {
  component: string
  part: string
  renames?: { from: string; to: string }[]
  flips?: { from: string; to: string }[]
  removes?: string[]
  ensure?: { name: string; value: string }[]
  require?: { name: string; from?: string; message: string }[]
}

export interface RenameConfig {
  rules: PropRule[]
}

export function makeRenameTransform(config: RenameConfig) {
  return (source: string, filePath: string, options: TransformOptions = {}): TransformResult => {
    const sf = createTransformSourceFile(filePath, source, options.crossFile ?? false)

    let count = 0
    const skipped: string[] = []

    const arkNames = arkLocalNames(sf, { crossFile: options.crossFile })
    if (arkNames.size === 0) return { code: null, count: 0, skipped: [] }

    const openings: JsxOpening[] = [
      ...sf.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
      ...sf.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ]

    for (const opening of openings) {
      if (!isTrackedJsx(opening, arkNames)) continue
      const tag = opening.getTagNameNode().getText()

      for (const rule of config.rules) {
        if (!matchesPart(tag, rule.component, rule.part)) continue
        count += applyRule(opening, rule, skipped)
      }
    }

    return { code: count > 0 ? sf.getFullText() : null, count, skipped }
  }
}

function matchesPart(tag: string, component: string, part: string): boolean {
  const segs = tag.split('.')
  if (segs.length !== 2) return false
  return segs[1] === part && segs[0].toLowerCase() === component.toLowerCase()
}

function applyRule(opening: JsxOpening, rule: PropRule, skipped: string[]): number {
  let changed = 0
  const where = `line ${opening.getStartLineNumber()} (${rule.component}.${rule.part})`

  for (const { from, to } of rule.renames ?? []) {
    const attr = getAttr(opening, from)
    if (!attr) continue
    attr.getNameNode().replaceWithText(to)
    changed++
  }

  for (const { from, to } of rule.flips ?? []) {
    const attr = getAttr(opening, from)
    if (!attr) continue
    attr.replaceWithText(`${to}=${invertBoolean(attr.getInitializer()?.getText())}`)
    changed++
  }

  for (const name of rule.removes ?? []) {
    const attr = getAttr(opening, name)
    if (!attr) continue
    attr.remove()
    changed++
  }

  for (const { name, value } of rule.ensure ?? []) {
    if (opening.getAttribute(name)) continue
    opening.addAttribute({ name, initializer: value })
    changed++
  }

  for (const { name, from, message } of rule.require ?? []) {
    if (opening.getAttribute(name)) continue
    const legacy = from ? getAttr(opening, from) : undefined
    if (legacy) {
      legacy.getNameNode().replaceWithText(name)
      changed++
      continue
    }
    skipped.push(`${where}: ${message}`)
  }

  return changed
}

function getAttr(opening: JsxOpening, name: string) {
  const attr = opening.getAttribute(name)
  return attr && Node.isJsxAttribute(attr) ? attr : undefined
}

function invertBoolean(initText: string | undefined): string {
  if (initText === undefined) return '{false}'
  if (initText === '{true}') return '{false}'
  if (initText === '{false}') return '{true}'
  const inner = initText.startsWith('{') && initText.endsWith('}') ? initText.slice(1, -1) : initText
  return `{!(${inner})}`
}
