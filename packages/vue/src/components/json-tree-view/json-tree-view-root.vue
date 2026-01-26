<script lang="ts">
import type { JsonNode } from '@zag-js/json-tree-utils'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { TreeViewRootBaseProps } from '../tree-view'
import type { JsonTreeViewOptions } from './json-tree-view-props-context'

export interface JsonTreeViewRootBaseProps
  extends JsonTreeViewOptions, Omit<TreeViewRootBaseProps<JsonNode>, 'collection'> {
  /**
   * The data to display in the tree.
   */
  data: object
  /**
   * The default expand level.
   */
  defaultExpandedDepth?: number
}

export interface JsonTreeViewRootProps
  extends
    JsonTreeViewRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { computed } from 'vue'
import { createSplitProps } from '../create-split-props'
import { TreeView, createTreeCollection } from '../tree-view'
import { getBranchValues } from './get-branch-value'
import { JsonTreeViewPropsProvider } from './json-tree-view-props-context'

const props = withDefaults(defineProps<JsonTreeViewRootProps>(), {
  expandOnClick: undefined,
  typeahead: undefined,
  lazyMount: undefined,
  unmountOnExit: undefined,
  asChild: undefined,
  showNonenumerable: undefined,
  quotesOnKeys: undefined,
} satisfies BooleanDefaults<JsonTreeViewRootBaseProps>)

const splitJsonTreeViewProps = createSplitProps<JsonTreeViewOptions>()
const [jsonTreeProps, localProps] = splitJsonTreeViewProps(props, [
  'maxPreviewItems',
  'collapseStringsAfterLength',
  'quotesOnKeys',
  'groupArraysAfterLength',
  'showNonenumerable',
])

const { data, defaultExpandedDepth, ...restProps } = localProps

const collection = computed(() => {
  return createTreeCollection<JsonNode>({
    nodeToValue,
    nodeToString,
    rootNode: getRootNode(data),
  })
})

const defaultExpandedValue = computed(() => {
  const expandedValue =
    defaultExpandedDepth != null ? getBranchValues(collection.value, defaultExpandedDepth) : undefined
  return props.defaultExpandedValue || expandedValue
})

JsonTreeViewPropsProvider(computed(() => jsonTreeProps))
</script>

<template>
  <TreeView.Root
    data-scope="json-tree-view"
    v-bind="restProps"
    :collection="collection"
    :defaultExpandedValue="defaultExpandedValue"
    :typeahead="false"
  >
    <slot />
  </TreeView.Root>
</template>
