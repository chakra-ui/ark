import type { PropTypes } from '@zag-js/vue'
import type * as treeView from '@zag-js/tree-view'
import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { type ComputedRef, type MaybeRef, computed, toValue } from 'vue'
import { createSplitProps } from '../create-split-props'
import { type UseTreeViewProps, createTreeCollection, useTreeView } from '../tree-view'
import { getBranchValues } from './get-branch-value'
import type { JsonTreeViewOptions } from './json-tree-view-props-context'

export interface UseJsonTreeViewProps extends Omit<UseTreeViewProps<JsonNode>, 'collection'>, JsonTreeViewOptions {
  data: unknown
  defaultExpandedDepth?: number
}

export interface UseJsonTreeViewReturn extends ComputedRef<
  treeView.Api<PropTypes, JsonNode> & { options: JsonTreeViewOptions }
> {}

const splitJsonTreeViewProps = createSplitProps<JsonTreeViewOptions>()

export const useJsonTreeView = (props: MaybeRef<UseJsonTreeViewProps>): UseJsonTreeViewReturn => {
  const [jsonTreeProps, localProps] = splitJsonTreeViewProps(toValue(props), [
    'maxPreviewItems',
    'collapseStringsAfterLength',
    'quotesOnKeys',
    'groupArraysAfterLength',
    'showNonenumerable',
  ])

  const machineProps = computed<UseTreeViewProps<JsonNode>>(() => {
    const { data, defaultExpandedDepth, ...restProps } = localProps

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

  const treeView = useTreeView(machineProps)

  return computed(() => ({ ...treeView.value, options: jsonTreeProps }))
}
