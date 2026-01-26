<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewBranchBaseProps extends PolymorphicProps {}
export interface TreeViewBranchProps
  extends
    TreeViewBranchBaseProps,
    /**
     * @vue-ignore̊
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useRenderStrategyProps } from '../../utils/use-render-strategy'
import { Collapsible } from '../collapsible'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'
import { useTreeViewNodeContext } from './use-tree-view-node-context'

defineProps<TreeViewBranchProps>()

const treeView = useTreeViewContext()

const nodeProps = useTreeViewNodePropsContext()
const nodeState = useTreeViewNodeContext()

const renderStrategyProps = useRenderStrategyProps()
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
