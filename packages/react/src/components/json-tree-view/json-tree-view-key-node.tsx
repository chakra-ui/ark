import type { JsonNode } from '@zag-js/json-tree-utils'

interface JsonTreeViewKeyNodeProps {
  /**
   * The node to render.
   */
  node: JsonNode
  /**
   * Whether to show quotes on the key.
   */
  showQuotes?: boolean
}
export const JsonTreeViewKeyNode = (props: JsonTreeViewKeyNodeProps): React.ReactNode => {
  const { node, showQuotes } = props
  return (
    <>
      <span data-kind="key" data-non-enumerable={node.isNonEnumerable ? '' : undefined}>
        {showQuotes ? `"${node.key}"` : node.key}
      </span>
      <span data-kind="colon">: </span>
    </>
  )
}
