import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { forwardRef, useMemo } from 'react'
import { TreeView, createTreeCollection } from '../tree-view'

export interface JsonTreeViewRootProps extends Omit<TreeView.RootProps<JsonNode>, 'collection'> {
  data: unknown
}

export const JsonTreeViewRoot = forwardRef<HTMLDivElement, JsonTreeViewRootProps>((props, ref) => {
  const { data, ...restProps } = props

  const collection = useMemo(() => {
    return createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    })
  }, [data])

  return (
    <TreeView.Root data-scope="json-tree-view" collection={collection} {...restProps} ref={ref} typeahead={false} />
  )
})

JsonTreeViewRoot.displayName = 'JsonTreeViewRoot'
