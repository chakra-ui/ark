import type { JSX } from 'solid-js'
import { filterObject } from './filter-object'
import { mergeStyle } from './merge-style'
import { parse, render } from './parse-template'

type Props = JSX.Element | { t: string }

const isJSXElement = (children: Props): children is JSX.Element =>
  !Object.hasOwnProperty.call(children, 't')

export const ssrSpread = (children: any, attrs: any) => {
  if (isJSXElement(children)) return children

  const { t } = children
  const ast = parse(t)
  const [node] = ast.children

  const filteredAttrs = filterObject(attrs, ([, v]) => typeof v !== 'function')

  const nodeAttrs = Object.assign({}, node.attributes, filteredAttrs, {
    class: [attrs.class, filteredAttrs.class].filter(Boolean).join(' '),
    style: mergeStyle(attrs.style, filteredAttrs.style),
  })

  Object.assign(node.attributes, nodeAttrs)

  return { t: render(ast) }
}
