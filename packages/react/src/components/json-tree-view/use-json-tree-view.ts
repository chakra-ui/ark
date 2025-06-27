import { useMemo } from 'react'
import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '../../../../json-tree-utils'
import { type UseTreeViewProps, type UseTreeViewReturn, createTreeCollection, useTreeView } from '../tree-view'

export interface UseJsonTreeViewProps<T = unknown> extends Omit<UseTreeViewProps<JsonNode>, 'collection'> {
  data: T
}

export interface UseJsonTreeViewReturn extends UseTreeViewReturn<JsonNode> {}

export const useJsonTreeView = <T = unknown>(props: UseJsonTreeViewProps<T>) => {
  const { data, ...restProps } = props

  const collection = useMemo(() => {
    return createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    })
  }, [data])

  return useTreeView({
    ...restProps,
    collection,
    typeahead: false,
  })
}
