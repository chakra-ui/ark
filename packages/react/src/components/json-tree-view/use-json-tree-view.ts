import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { useMemo } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type UseTreeViewProps, type UseTreeViewReturn, createTreeCollection, useTreeView } from '../tree-view'
import { getBranchValues } from './get-branch-value'
import type { JsonTreeViewOptions } from './json-tree-view-props-context'

export interface UseJsonTreeViewProps extends Omit<UseTreeViewProps<JsonNode>, 'collection'>, JsonTreeViewOptions {
  data: unknown
  defaultExpandedDepth?: number
}

export interface UseJsonTreeViewReturn extends UseTreeViewReturn<JsonNode> {
  options: JsonTreeViewOptions
}

const splitJsonTreeViewProps = createSplitProps<JsonTreeViewOptions>()

export const useJsonTreeView = (props: UseJsonTreeViewProps): UseJsonTreeViewReturn => {
  const [jsonTreeProps, localProps] = splitJsonTreeViewProps(props, [
    'maxPreviewItems',
    'collapseStringsAfterLength',
    'quotesOnKeys',
    'groupArraysAfterLength',
    'showNonenumerable',
  ])

  const { data, defaultExpandedDepth = 1, ...restProps } = localProps

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

  const treeView = useTreeView({
    defaultExpandedValue,
    ...restProps,
    collection,
    typeahead: false,
  })

  return { ...treeView, options: jsonTreeProps }
}
