import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { type MaybeRef, computed, toValue } from 'vue'
import { type UseTreeViewProps, type UseTreeViewReturn, createTreeCollection, useTreeView } from '../tree-view'
import { getBranchValues } from './get-branch-value'

export interface UseJsonTreeViewProps extends Omit<UseTreeViewProps<JsonNode>, 'collection'> {
  data: unknown
  defaultExpandedDepth?: number
}

export interface UseJsonTreeViewReturn extends UseTreeViewReturn<JsonNode> {}

export const useJsonTreeView = (props: MaybeRef<UseJsonTreeViewProps>): UseJsonTreeViewReturn => {
  const machineProps = computed<UseTreeViewProps<JsonNode>>(() => {
    const { data, defaultExpandedDepth, ...restProps } = toValue(props)

    const collection = createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    })

    const defaultExpandedValue =
      defaultExpandedDepth != null ? getBranchValues(collection, defaultExpandedDepth) : undefined

    return {
      defaultExpandedValue,
      ...restProps,
      collection,
      typeahead: false,
    }
  })

  return useTreeView(machineProps)
}
