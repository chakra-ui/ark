<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { TreeNode } from '../collection'
import type { PolymorphicProps } from '../factory'
import type { UseTreeViewReturn } from './use-tree-view'

interface RootProviderProps<T extends TreeNode> {
  value: UnwrapRef<UseTreeViewReturn<T>>
}

export interface TreeViewRootProviderBaseProps<T extends TreeNode>
  extends RootProviderProps<T>,
    RenderStrategyProps,
    PolymorphicProps {}
export interface TreeViewRootProviderProps<T extends TreeNode>
  extends TreeViewRootProviderBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts" generic="T extends TreeNode">
import { computed } from 'vue'
import { RenderStrategyPropsProvider, useForwardExpose, } from '../../utils'
import { ark } from '../factory'
import { TreeViewProvider } from './use-tree-view-context'

const props = defineProps<TreeViewRootProviderProps<T>>()
const treeView = computed(() => props.value)

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
