import { runIfFn } from '$lib/utils/run-if-fn'
import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import type { MaybeFunction } from '@zag-js/utils'
import { untrack } from 'svelte'
import { type UseTreeViewProps, type UseTreeViewReturn, createTreeCollection, useTreeView } from '../tree-view'
import { getBranchValues } from './get-branch-value'

export interface UseJsonTreeViewProps extends Omit<UseTreeViewProps<JsonNode>, 'collection'> {
  data: unknown
  defaultExpandedDepth?: number
}

export interface UseJsonTreeViewReturn extends UseTreeViewReturn<JsonNode> {}

export const useJsonTreeView = (props: MaybeFunction<UseJsonTreeViewProps>): UseJsonTreeViewReturn => {
  const machineProps = $derived.by<UseTreeViewProps<JsonNode>>(() => {
    const { data, defaultExpandedDepth, ...restProps } = runIfFn(props)

    const collection = createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    })

    const defaultExpandedValue = untrack(() =>
      defaultExpandedDepth != null ? getBranchValues(collection, defaultExpandedDepth) : undefined,
    )

    return {
      collection,
      defaultExpandedValue,
      ...restProps,
      typeahead: false,
    }
  })

  return useTreeView(() => machineProps)
}
