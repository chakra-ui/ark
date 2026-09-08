import { parse } from '@vue/compiler-sfc'
import MagicString from 'magic-string'
import type { TransformResult } from '../../types.ts'

interface Loc {
  start: { offset: number }
  end: { offset: number }
}

interface Prop {
  type: number
  name: string
  arg?: { content?: string }
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
const TEXT = 2
const ATTRIBUTE = 6
const DIRECTIVE = 7

const isAsChild = (name: string | undefined) => name === 'asChild' || name === 'as-child'

export function vueAsChildToRender(source: string, _filePath: string): TransformResult {
  const { descriptor, errors } = parse(source)
  if (errors.length > 0) return { code: null, count: 0, skipped: [`template did not parse: ${errors[0].message}`] }

  const ast = descriptor.template?.ast as unknown as Node | undefined
  if (!ast) return { code: null, count: 0, skipped: [] }

  const s = new MagicString(source)
  let count = 0
  const skipped: string[] = []

  walk(ast, (node) => {
    const at = `line ${lineOf(source, node.loc.start.offset)}`

    const bound = node.props?.find((p) => p.type === DIRECTIVE && p.name === 'bind' && isAsChild(p.arg?.content))
    if (bound) {
      skipped.push(`${at}: asChild is bound to an expression, so the child cannot be lifted mechanically`)
      return
    }

    const attr = node.props?.find((p) => p.type === ATTRIBUTE && isAsChild(p.name))
    if (!attr) return

    const children = (node.children ?? []).filter((c) => !(c.type === TEXT && !textOf(source, c).trim()))
    if (children.length !== 1 || children[0].type !== ELEMENT) {
      skipped.push(`${at}: expected exactly one child element, found ${children.length}`)
      return
    }

    const child = children[0]
    if (child.props?.some((p) => p.name === 'bind' && !p.arg?.content)) {
      skipped.push(`${at}: the child already binds props`)
      return
    }

    s.overwrite(attr.loc.start.offset, attr.loc.end.offset, '#render="{ props }"')
    s.appendLeft(child.loc.start.offset + 1 + (child.tag?.length ?? 0), ' v-bind="props"')
    count++
  })

  return { code: count > 0 ? s.toString() : null, count, skipped }
}

function walk(node: Node, visit: (node: Node) => void): void {
  if (node.type === ELEMENT) visit(node)
  for (const child of node.children ?? []) walk(child, visit)
}

function textOf(source: string, node: Node): string {
  return source.slice(node.loc.start.offset, node.loc.end.offset)
}

function lineOf(source: string, offset: number): number {
  return source.slice(0, offset).split('\n').length
}
