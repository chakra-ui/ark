import type { JsonNodeHastElement } from '@zag-js/json-tree-utils'

interface JsonTreeViewValueNodeProps {
  node: JsonNodeHastElement
}
export const JsonTreeViewValueNode = (props: JsonTreeViewValueNodeProps): React.ReactNode => {
  const { node } = props

  // Handle text nodes
  if (node.type === 'text') {
    return <>{node.value}</>
  }

  // Handle element nodes
  const Element = node.tagName
  return (
    <Element
      data-root={node.properties.root ? '' : undefined}
      data-type={node.properties.nodeType}
      data-kind={node.properties.kind}
      suppressHydrationWarning
    >
      {node.children.map((child, index) => (
        <JsonTreeViewValueNode key={index} node={child} />
      ))}
    </Element>
  )
}
