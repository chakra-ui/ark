import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { useMemo } from 'react'
import { type UseTreeViewProps, type UseTreeViewReturn, createTreeCollection, useTreeView } from '../tree-view'
import { getBranchValues } from './get-branch-value'

export interface UseJsonTreeViewProps extends Omit<UseTreeViewProps<JsonNode>, 'collection'> {
  data: unknown
  defaultExpandedDepth?: number
}

export interface UseJsonTreeViewReturn extends UseTreeViewReturn<JsonNode> {}

export const useJsonTreeView = (props: UseJsonTreeViewProps) => {
  const { data, defaultExpandedDepth = 1, ...restProps } = props

  const collection = useMemo(() => {
    return createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    })
  }, [data])

  const defaultExpandedValue = useMemo(() => {
    return defaultExpandedDepth != null ? getBranchValues(collection, defaultExpandedDepth) : undefined
  }, [collection, defaultExpandedDepth])

  return useTreeView({
    defaultExpandedValue,
    ...restProps,
    collection,
    typeahead: false,
  })
}
