import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { useMemo } from 'react'
import { TreeView, createTreeCollection } from '../tree-view'

export interface JsonTreeViewRootProps<T = unknown> extends Omit<TreeView.RootProps<JsonNode>, 'collection'> {
  data: T
}

export function JsonTreeViewRoot<T = unknown>(props: JsonTreeViewRootProps<T>) {
  const { data, ...restProps } = props

  const collection = useMemo(() => {
    return createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    })
  }, [data])

  return <TreeView.Root data-scope="json-tree-view" typeahead={false} collection={collection} {...restProps} />
}
