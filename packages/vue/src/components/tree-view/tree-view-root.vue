<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { TreeNode } from '../collection'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './tree-view.types'

export interface TreeViewRootBaseProps<T extends TreeNode>
  extends RootProps<T>,
    RenderStrategyProps,
    PolymorphicProps {}
export interface TreeViewRootProps<T extends TreeNode>
  extends TreeViewRootBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export type { RootEmits as TreeViewRootEmits } from './tree-view.types'
</script>

<script setup lang="ts" generic="T extends TreeNode">
import { computed } from 'vue'
import {
  RenderStrategyPropsProvider,
  useForwardExpose,
  type RenderStrategyProps,
} from '../../utils'
import { ark } from '../factory'
import { useTreeView } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

const props = withDefaults(defineProps<TreeViewRootProps<T>>(), {
  expandOnClick: undefined,
  typeahead: undefined,
} satisfies BooleanDefaults<RootProps<T>>)

const emits = defineEmits<RootEmits>()

const treeView = useTreeView(props, emits)
TreeViewProvider(treeView)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="treeView.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
