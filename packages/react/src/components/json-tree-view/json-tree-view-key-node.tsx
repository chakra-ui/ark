import { type JsonNode, keyPathToKey } from '@zag-js/json-tree-utils'

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
  const key = keyPathToKey(node.keyPath)
  return (
    <>
      <span data-kind="key" suppressHydrationWarning data-non-enumerable={node.isNonEnumerable ? '' : undefined}>
        {showQuotes ? `"${key}"` : key}
      </span>
      <span data-kind="colon">: </span>
    </>
  )
}
