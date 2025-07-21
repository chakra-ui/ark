import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { forwardRef, useMemo } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { TreeView, createTreeCollection } from '../tree-view'
import { getBranchValues } from './get-branch-value'
import { type JsonTreeViewOptions, JsonTreeViewPropsProvider } from './json-tree-view-props-context'

export interface JsonTreeViewRootProps extends Omit<TreeView.RootProps<JsonNode>, 'collection'>, JsonTreeViewOptions {
  /**
   * The data to display in the tree.
   */
  data: unknown
  /**
   * The default expand level.
   */
  defaultExpandedDepth?: number
}

const splitJsonTreeViewProps = createSplitProps<JsonTreeViewOptions>()

export const JsonTreeViewRoot = forwardRef<HTMLDivElement, JsonTreeViewRootProps>((props, ref) => {
  const [jsonTreeProps, localProps] = splitJsonTreeViewProps(props, [
    'maxPreviewItems',
    'collapseStringsAfterLength',
    'quotesOnKeys',
    'groupArraysAfterLength',
    'showNonenumerable',
  ])

  const { data, defaultExpandedDepth, ...restProps } = localProps

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

  return (
    <JsonTreeViewPropsProvider value={jsonTreeProps}>
      <TreeView.Root
        data-scope="json-tree-view"
        collection={collection}
        defaultExpandedValue={defaultExpandedValue}
        {...restProps}
        ref={ref}
      />
    </JsonTreeViewPropsProvider>
  )
})

JsonTreeViewRoot.displayName = 'JsonTreeViewRoot'
