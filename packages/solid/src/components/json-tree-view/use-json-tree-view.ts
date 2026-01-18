import type { PropTypes } from '@zag-js/solid'
import type * as treeView from '@zag-js/tree-view'
import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { type Accessor, createMemo, splitProps } from 'solid-js'
import { untrack } from 'solid-js/web'
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

export const useJsonTreeView = (props: UseJsonTreeViewProps): UseJsonTreeViewReturn => {
  const [jsonTreeProps, localProps] = splitJsonTreeViewProps(props, [
    'maxPreviewItems',
    'collapseStringsAfterLength',
    'quotesOnKeys',
    'groupArraysAfterLength',
    'showNonenumerable',
  ])

  const [jsonProps, restProps] = splitProps(localProps, ['data', 'defaultExpandedDepth'])

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

  const treeView = useTreeView(machineProps)

  return createMemo(() => ({ ...treeView(), options: jsonTreeProps }))
}
