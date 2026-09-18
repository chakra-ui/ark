import { parse } from '@vue/compiler-sfc'
import MagicString from 'magic-string'
import type { TransformResult } from '../../types.ts'
import { arkLocalNamesFromSource, jsxBaseNameFromText } from '../../utils/ark-imports.ts'
import type { PropRule, RenameConfig } from './engine.ts'

interface Loc {
  start: { offset: number }
  end: { offset: number }
}
interface Prop {
  type: number
  name: string
  arg?: { content?: string; loc: Loc }
  exp?: { content?: string }
  value?: { content?: string }
  loc: Loc
}
interface Node {
  type: number
  tag?: string
  props?: Prop[]
  children?: Node[]
  loc: Loc
}

const ELEMENT = 1
const ATTRIBUTE = 6
const DIRECTIVE = 7

const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

export function makeVueRenameTransform(config: RenameConfig) {
  return (source: string, _filePath: string): TransformResult => {
    const { descriptor, errors } = parse(source)
    if (errors.length > 0) return { code: null, count: 0, skipped: [`template did not parse: ${errors[0].message}`] }

    const ast = descriptor.template?.ast as unknown as Node | undefined
    if (!ast) return { code: null, count: 0, skipped: [] }

    const arkNames = arkLocalNamesFromSource(source)
    if (arkNames.size === 0) return { code: null, count: 0, skipped: [] }

    const s = new MagicString(source)
    let count = 0
    const skipped: string[] = []

    walk(ast, (node) => {
      const tag = node.tag ?? ''
      if (!arkNames.has(jsxBaseNameFromText(tag))) return
      for (const rule of config.rules) {
        if (!matchesPart(tag, rule.component, rule.part)) continue
        count += applyRule(s, node, rule, source, skipped)
      }
    })

    return { code: count > 0 ? s.toString() : null, count, skipped }
  }
}

function matchesPart(tag: string, component: string, part: string): boolean {
  const segs = tag.split('.')
  if (segs.length !== 2) return false
  return segs[1] === part && segs[0].toLowerCase() === component.toLowerCase()
}

function applyRule(s: MagicString, node: Node, rule: PropRule, source: string, skipped: string[]): number {
  let changed = 0
  const find = (name: string) =>
    node.props?.find((p) => propName(p) !== undefined && kebab(propName(p) as string) === kebab(name))

  for (const { from, to } of rule.renames ?? []) {
    const prop = find(from)
    if (!prop) continue
    renameProp(s, prop, to)
    changed++
  }

  for (const { from, to } of rule.flips ?? []) {
    const prop = find(from)
    if (!prop) continue
    s.overwrite(prop.loc.start.offset, prop.loc.end.offset, `:${kebab(to)}="${invertBoolean(prop)}"`)
    changed++
  }

  for (const name of rule.removes ?? []) {
    const prop = find(name)
    if (!prop) continue
    const from = source[prop.loc.start.offset - 1] === ' ' ? prop.loc.start.offset - 1 : prop.loc.start.offset
    s.remove(from, prop.loc.end.offset)
    changed++
  }

  for (const { name, value } of rule.ensure ?? []) {
    if (find(name)) continue
    s.appendLeft(node.loc.start.offset + 1 + (node.tag?.length ?? 0), ` ${ensureAttr(name, value)}`)
    changed++
  }

  for (const { name, from, message } of rule.require ?? []) {
    if (find(name)) continue
    const legacy = from ? find(from) : undefined
    if (legacy) {
      renameProp(s, legacy, name)
      changed++
      continue
    }
    skipped.push(`line ${lineOf(source, node.loc.start.offset)}: ${message}`)
  }

  return changed
}

function propName(prop: Prop): string | undefined {
  if (prop.type === ATTRIBUTE) return prop.name
  if (prop.type === DIRECTIVE && prop.name === 'bind') return prop.arg?.content
  return undefined
}

function renameProp(s: MagicString, prop: Prop, to: string): void {
  if (prop.type === ATTRIBUTE) {
    s.overwrite(prop.loc.start.offset, prop.loc.start.offset + prop.name.length, kebab(to))
    return
  }
  const arg = prop.arg
  if (arg?.content) s.overwrite(arg.loc.start.offset, arg.loc.start.offset + arg.content.length, kebab(to))
}

function invertBoolean(prop: Prop): string {
  if (prop.type === DIRECTIVE) {
    const expr = prop.exp?.content ?? 'true'
    return `!(${expr})`
  }
  const value = prop.value?.content
  if (value === 'false') return 'true'
  return 'false'
}

function ensureAttr(name: string, value: string): string {
  if (value === '{true}') return kebab(name)
  if (value === '{false}') return `:${kebab(name)}="false"`
  const inner = value.startsWith('{') && value.endsWith('}') ? value.slice(1, -1) : value
  return `:${kebab(name)}="${inner}"`
}

function walk(node: Node, visit: (node: Node) => void): void {
  if (node.type === ELEMENT) visit(node)
  for (const child of node.children ?? []) walk(child, visit)
}

function lineOf(source: string, offset: number): number {
  return source.slice(0, offset).split('\n').length
}
