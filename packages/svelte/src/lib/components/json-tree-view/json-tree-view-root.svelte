<script lang="ts">
  import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
  import { createSplitProps } from '../../utils/create-split-props'
  import { TreeView, createTreeCollection, type TreeViewRootProps } from '../tree-view'
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
    extends Omit<TreeViewRootProps<JsonNode>, 'collection'>, JsonTreeViewRootBaseProps {}

  const { data, defaultExpandedDepth, ...props }: JsonTreeViewRootProps = $props()

  const splitJsonTreeViewProps = createSplitProps<JsonTreeViewOptions>()

  const [jsonTreeProps, localProps] = $derived(
    splitJsonTreeViewProps(props, [
      'maxPreviewItems',
      'collapseStringsAfterLength',
      'quotesOnKeys',
      'groupArraysAfterLength',
      'showNonenumerable',
    ]),
  )

  const collection = $derived(
    createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    }),
  )

  const defaultExpandedValue = $derived(
    defaultExpandedDepth != null ? getBranchValues(collection, defaultExpandedDepth) : undefined,
  )

  JsonTreeViewPropsProvider(() => jsonTreeProps)
</script>

<TreeView.Root data-scope="json-tree-view" {collection} {defaultExpandedValue} {...localProps}>
  {@render props.children?.()}
</TreeView.Root>
