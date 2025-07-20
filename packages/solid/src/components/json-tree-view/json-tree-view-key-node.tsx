import { type JsonNode, keyPathToKey } from '@zag-js/json-tree-utils'
import { type JSX, createMemo } from 'solid-js'

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

export const JsonTreeViewKeyNode = (props: JsonTreeViewKeyNodeProps): JSX.Element => {
  const key = createMemo(() => keyPathToKey(props.node.keyPath))
  return (
    <>
      <span data-kind="key" data-non-enumerable={props.node.isNonEnumerable ? '' : undefined}>
        {props.showQuotes ? `"${key()}"` : key()}
      </span>
      <span data-kind="colon">: </span>
    </>
  )
}
