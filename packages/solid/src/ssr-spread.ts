import type { JSX } from 'solid-js'

type Props = { children: JSX.Element | { t: string } }

const isJSXElement = (children: Props): children is JSX.Element =>
  !Object.hasOwnProperty.call(children, 't')

export const ssrSpread = <T extends Props>(props: T, attrs: () => any): T => {
  return props.children
  // console.log('fooo ---')
  // if (isJSXElement(children)) return children
  // console.log('fooo ---!!!')
  // const { t } = children
  // const ast = parse(t)
  // const [node] = ast.children

  // // const filteredAttrs = filterObject(attrs, ([, v]) => typeof v !== 'function')

  // // const nodeAttrs = Object.assign({}, node.attributes, filteredAttrs, {
  // //   // class: [attrs.class, filteredAttrs.class].filter(Boolean).join(' '),
  // //   // style: mergeStyle(attrs.style, filteredAttrs.style),
  // // })

  // Object.assign(node.attributes, { 'data-test-id': 'test' })

  // return { t: render(ast) } as T
}
