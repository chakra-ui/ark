import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { createMemo, splitProps } from 'solid-js'
import { untrack } from 'solid-js/web'
import { type UseTreeViewProps, type UseTreeViewReturn, createTreeCollection, useTreeView } from '../tree-view'
import { getBranchValues } from './get-branch-value'

export interface UseJsonTreeViewProps extends Omit<UseTreeViewProps<JsonNode>, 'collection'> {
  data: unknown
  defaultExpandedDepth?: number
}

export interface UseJsonTreeViewReturn extends UseTreeViewReturn<JsonNode> {}

export const useJsonTreeView = (props: UseJsonTreeViewProps): UseJsonTreeViewReturn => {
  const [jsonProps, restProps] = splitProps(props, ['data', 'defaultExpandedDepth'])

  const collection = createMemo(() => {
    return createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(jsonProps.data),
    })
  })

  const defaultExpandedValue = createMemo(() => {
    return jsonProps.defaultExpandedDepth != null
      ? getBranchValues(collection(), jsonProps.defaultExpandedDepth)
      : undefined
  })

  const machineProps = createMemo<UseTreeViewProps<JsonNode>>(() => {
    return {
      defaultExpandedValue: untrack(defaultExpandedValue),
      ...restProps,
      collection: collection(),
      typeahead: false,
    }
  })

  return useTreeView(machineProps)
}
