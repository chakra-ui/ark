import type { JsonNodeElement } from '../../../../json-tree-utils'

interface JsonTreeViewValueNodeProps {
  node: JsonNodeElement
}
export const JsonTreeViewValueNode = (props: JsonTreeViewValueNodeProps): React.ReactNode => {
  const { node } = props
  return (
    <span data-type={node.props.nodeType} data-kind={node.props.kind}>
      {Array.isArray(node.props.children)
        ? node.props.children.map((child, index) => (
            <span key={index} data-type={child.props.nodeType} data-kind={child.props.kind}>
              <JsonTreeViewValueNode node={child} />
            </span>
          ))
        : node.props.children}
    </span>
  )
}
