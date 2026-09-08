import { parse } from '@vue/compiler-sfc'
import MagicString from 'magic-string'
import type { TransformResult } from '../../types.ts'

type Node = {
  type: number
  tag?: string
  props?: Array<{ type: number; name: string; loc: { start: { offset: number }; end: { offset: number } } }>
  children?: Node[]
  loc: { start: { offset: number }; end: { offset: number } }
}

const ELEMENT = 1
const TEXT = 2
const ATTRIBUTE = 6

/**
 * Vue's `asChild` is a boolean and the replaced element is the single child. The
 * `render` slot hands the props to the slot body, so the child has to bind them.
 *
 *   <Popover.Trigger asChild>
 *     <button>Open</button>
 *   </Popover.Trigger>
 *
 * becomes
 *
 *   <Popover.Trigger #render="{ props }">
 *     <button v-bind="props">Open</button>
 *   </Popover.Trigger>
 */
export function vueAsChildToRender(source: string, _filePath: string): TransformResult {
  const { descriptor, errors } = parse(source)
  if (errors.length > 0) return { code: null, count: 0, skipped: [`template did not parse: ${errors[0].message}`] }

  const ast = descriptor.template?.ast as unknown as Node | undefined
  if (!ast) return { code: null, count: 0, skipped: [] }

  const s = new MagicString(source)
  let count = 0
  const skipped: string[] = []

  walk(ast, (node) => {
    const attr = node.props?.find((p) => p.type === ATTRIBUTE && (p.name === 'asChild' || p.name === 'as-child'))
    if (!attr) return

    const at = `line ${lineOf(source, node.loc.start.offset)}`
    const children = (node.children ?? []).filter((c) => !(c.type === TEXT && !textOf(source, c).trim()))

    if (children.length !== 1 || children[0].type !== ELEMENT) {
      skipped.push(`${at}: expected exactly one child element, found ${children.length}`)
      return
    }

    const child = children[0]
    const bound = child.props?.some((p) => p.name === 'bind' || p.name === 'v-bind')
    if (bound) {
      skipped.push(`${at}: the child already binds props`)
      return
    }

    s.overwrite(attr.loc.start.offset, attr.loc.end.offset, '#render="{ props }"')

    // insert v-bind on the child's opening tag, right after the tag name
    const childStart = child.loc.start.offset
    const tagEnd = childStart + 1 + (child.tag?.length ?? 0)
    s.appendLeft(tagEnd, ' v-bind="props"')
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
