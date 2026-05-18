<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { Assign } from '../../types.ts'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { TreeNode } from '../collection/index.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { UseTreeViewReturn } from './use-tree-view.ts'

interface RootProviderProps<T extends TreeNode> {
  value: UnwrapRef<UseTreeViewReturn<T>>
}

export interface TreeViewRootProviderBaseProps<T extends TreeNode>
  extends RootProviderProps<T>, RenderStrategyProps, PolymorphicProps {}
export interface TreeViewRootProviderProps<T extends TreeNode>
  extends
    TreeViewRootProviderBaseProps<T>,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

export type TreeViewRootProviderComponent<P = {}> = <T extends TreeNode>(
  props: Assign<TreeViewRootProviderProps<T>, P>,
) => any
</script>

<script setup lang="ts" generic="T extends TreeNode">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { TreeViewProvider } from './use-tree-view-context.ts'

const props = defineProps<TreeViewRootProviderProps<T>>()
const treeView = computed(() => props.value)

TreeViewProvider(treeView)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="treeView.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
