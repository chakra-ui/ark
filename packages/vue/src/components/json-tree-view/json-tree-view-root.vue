<script lang="ts">
import type { JsonNode } from '@zag-js/json-tree-utils'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { TreeViewRootBaseProps } from '../tree-view/index.ts'
import type { JsonTreeViewOptions } from './json-tree-view-props-context.ts'

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
import { useEmitAsProps } from '../../utils/use-emits-as-props.ts'
import { createSplitProps } from '../create-split-props.ts'
import { TreeView, createTreeCollection } from '../tree-view/index.ts'
import type { RootEmits } from '../tree-view/tree-view.types.ts'
import { getBranchValues } from './get-branch-value.ts'
import { JsonTreeViewPropsProvider } from './json-tree-view-props-context.ts'

const props = withDefaults(defineProps<JsonTreeViewRootProps>(), {
  expandOnClick: undefined,
  typeahead: undefined,
  lazyMount: undefined,
  unmountOnExit: undefined,
  asChild: undefined,
  showNonenumerable: undefined,
  quotesOnKeys: undefined,
} satisfies BooleanDefaults<JsonTreeViewRootBaseProps>)

const emits = defineEmits<RootEmits<JsonNode>>()
const emitsAsProps = useEmitAsProps(emits)

const splitJsonTreeViewProps = createSplitProps<JsonTreeViewOptions>()
const splitProps = computed(() =>
  splitJsonTreeViewProps(props, [
    'maxPreviewItems',
    'collapseStringsAfterLength',
    'quotesOnKeys',
    'groupArraysAfterLength',
    'showNonenumerable',
  ]),
)

const rootProps = computed(() => {
  const { data: _, defaultExpandedDepth: __, ...rest } = splitProps.value[1]
  return rest
})

const collection = computed(() => {
  return createTreeCollection<JsonNode>({
    nodeToValue,
    nodeToString,
    rootNode: getRootNode(props.data),
  })
})

const defaultExpandedValue = computed(() => {
  const expandedValue =
    props.defaultExpandedDepth != null ? getBranchValues(collection.value, props.defaultExpandedDepth) : undefined
  return props.defaultExpandedValue || expandedValue
})

JsonTreeViewPropsProvider(computed(() => splitProps.value[0]))
</script>

<template>
  <TreeView.Root
    data-scope="json-tree-view"
    v-bind="{ ...rootProps, ...emitsAsProps }"
    :collection="collection"
    :defaultExpandedValue="defaultExpandedValue"
    :typeahead="false"
  >
    <slot />
  </TreeView.Root>
</template>
