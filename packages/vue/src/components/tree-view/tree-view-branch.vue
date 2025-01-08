<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewBranchBaseProps extends PolymorphicProps {}
export interface TreeViewBranchProps
  extends TreeViewBranchBaseProps,
    /**
     * @vue-ignore̊
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
iimport { useForwardExpose,useRenderStrategyProps } from '../../utils'
import { Collapsible } from '../collapsible'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'
defineProps<TreeViewBranchProps>()

const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()
const renderStrategyProps = useRenderStrategyProps()
const nodeState = computed(() => treeView.value.getNodeState(nodeProps))
const branchContentProps = computed(() => treeView.value.getBranchContentProps(nodeProps))

useForwardExpose()
</script>

<template>
  <Collapsible.Root
    :open="nodeState.expanded"
    :ids="{ content: branchContentProps.id }"
    v-bind="treeView.getBranchProps(nodeProps)"
    :lazy-mount="renderStrategyProps.lazyMount"
    :unmount-on-exit="renderStrategyProps.unmountOnExit"
    :as-child="asChild"
  >
    <slot />
  </Collapsible.Root>
</template>
