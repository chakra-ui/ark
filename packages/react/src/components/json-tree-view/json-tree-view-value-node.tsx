import type { JsonNodeHastElement } from '@zag-js/json-tree-utils'

interface JsonTreeViewValueNodeProps {
  node: JsonNodeHastElement
  renderValue?: (node: JsonNodeHastElement) => React.ReactNode
}

export const JsonTreeViewValueNode = (props: JsonTreeViewValueNodeProps): React.ReactNode => {
  const { node, renderValue } = props

  if (node.type === 'text') {
    return <>{renderValue?.(node) ?? node.value}</>
  }

  const Element = node.tagName
  return (
    <Element
      data-root={node.properties.root ? '' : undefined}
      data-type={node.properties.nodeType}
      data-kind={node.properties.kind}
      suppressHydrationWarning
    >
      {node.children.map((child, index) => (
        <JsonTreeViewValueNode key={index} node={child} renderValue={renderValue} />
      ))}
    </Element>
  )
}
