import { type JsonNode, keyPathToKey } from '@zag-js/json-tree-utils'
import { type JSX, createMemo } from 'solid-js'
import { ark } from '../factory'

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
      <ark.span data-kind="key" data-non-enumerable={props.node.isNonEnumerable ? '' : undefined}>
        {props.showQuotes ? `"${key()}"` : key()}
      </ark.span>
      <ark.span data-kind="colon">: </ark.span>
    </>
  )
}
