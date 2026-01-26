import type { Accessor } from '$lib/types'
import { runIfFn } from '$lib/utils/run-if-fn'
import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import type { PropTypes } from '@zag-js/svelte'
import type * as treeView from '@zag-js/tree-view'
import type { MaybeFunction } from '@zag-js/utils'
import { untrack } from 'svelte'
import { createSplitProps } from '../../utils/create-split-props'
import { type UseTreeViewProps, createTreeCollection, useTreeView } from '../tree-view'
import { getBranchValues } from './get-branch-value'
import type { JsonTreeViewOptions } from './json-tree-view-props-context'

export interface UseJsonTreeViewProps extends Omit<UseTreeViewProps<JsonNode>, 'collection'>, JsonTreeViewOptions {
  data: unknown
  defaultExpandedDepth?: number
}

export interface UseJsonTreeViewReturn extends Accessor<
  treeView.Api<PropTypes, JsonNode> & { options: JsonTreeViewOptions }
> {}

const splitJsonTreeViewProps = createSplitProps<JsonTreeViewOptions>()

export const useJsonTreeView = (props: MaybeFunction<UseJsonTreeViewProps>): UseJsonTreeViewReturn => {
  const [jsonTreeProps, localProps] = splitJsonTreeViewProps(runIfFn(props), [
    'maxPreviewItems',
    'collapseStringsAfterLength',
    'quotesOnKeys',
    'groupArraysAfterLength',
    'showNonenumerable',
  ])

  const machineProps = $derived.by<UseTreeViewProps<JsonNode>>(() => {
    const { data, defaultExpandedDepth, ...restProps } = localProps

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

  const treeView = useTreeView(() => machineProps)

  const api = $derived({ ...treeView(), options: jsonTreeProps })

  return () => api
}
