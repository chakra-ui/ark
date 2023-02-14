import type { JSX } from 'solid-js'
import { filterEmptyValues, filterFunctionValues } from './filter-object'
import { mergeStyle } from './merge-style'
import { parse, render } from './parse-template'
import { pipe } from './pipe'

type Children = { t: string } | JSX.Element

type Attributes = {
  class?: string
  style?: string | JSX.CSSProperties
} & object

export const ssrSpread = <T extends Children>(children: T, attributes: Attributes) => {
  if (isJSXElement(children)) return children

  const { t } = children
  const ast = parse(t)
  const [node] = ast.children

  const mergedAttributes = Object.assign({}, attributes, {
    class: [attributes?.class, node.attributes.class].filter(Boolean).join(' '),
    style: mergeStyle(attributes.style, node.attributes.style),
  })

  const ssrAttributes = pipe(mergedAttributes, filterEmptyValues, filterFunctionValues)

  Object.assign(node.attributes, ssrAttributes)

  return { t: render(ast) } as T
}

const isJSXElement = (children: Children): children is JSX.Element =>
  !Object.hasOwnProperty.call(children, 't')
