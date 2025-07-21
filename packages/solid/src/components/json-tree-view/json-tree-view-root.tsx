import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { type JSX, createMemo, splitProps } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { TreeView, createTreeCollection } from '../tree-view'
import { getBranchValues } from './get-branch-value'
import { type JsonTreeViewOptions, JsonTreeViewPropsProvider } from './json-tree-view-props-context'

export interface JsonTreeViewRootBaseProps extends JsonTreeViewOptions {
  /**
   * The data to display in the tree.
   */
  data: unknown
  /**
   * The default expand level.
   */
  defaultExpandedDepth?: number
}

export interface JsonTreeViewRootProps
  extends Omit<TreeView.RootProps<JsonNode>, 'collection'>,
    JsonTreeViewRootBaseProps {}

const splitJsonTreeViewProps = createSplitProps<JsonTreeViewOptions>()

export const JsonTreeViewRoot = (props: JsonTreeViewRootProps): JSX.Element => {
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

  return (
    <JsonTreeViewPropsProvider value={jsonTreeProps}>
      <TreeView.Root
        data-scope="json-tree-view"
        collection={collection()}
        defaultExpandedValue={defaultExpandedValue()}
        {...restProps}
      >
        {props.children}
      </TreeView.Root>
    </JsonTreeViewPropsProvider>
  )
}
