<script lang="ts">
import type { JsonNode } from '@zag-js/json-tree-utils'
import type { TreeViewRootProps } from '../tree-view'
import type { JsonTreeViewOptions } from './json-tree-view-props-context'

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
  extends Omit<TreeViewRootProps<JsonNode>, 'collection'>,
    JsonTreeViewRootBaseProps {}
</script>

<script setup lang="ts">
import { getRootNode, nodeToString, nodeToValue } from '@zag-js/json-tree-utils'
import { computed } from 'vue'
import { createSplitProps } from '../create-split-props'
import { TreeView, createTreeCollection } from '../tree-view'
import { getBranchValues } from './get-branch-value'
import { JsonTreeViewPropsProvider } from './json-tree-view-props-context'

/* @vue-ignore */
const props = defineProps<JsonTreeViewRootProps>()

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
    :collection="collection"
    v-bind="restProps"
    :defaultExpandedValue="defaultExpandedValue"
  >
    <slot />
  </TreeView.Root>
</template>
