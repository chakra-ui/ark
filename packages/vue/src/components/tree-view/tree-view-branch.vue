<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useRenderStrategyProps } from '../../utils/use-render-strategy.ts'
import { Collapsible } from '../collapsible/index.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'
import { useTreeViewNodeContext } from './use-tree-view-node-context.ts'

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
