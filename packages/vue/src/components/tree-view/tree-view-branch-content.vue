<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewBranchContentBaseProps extends PolymorphicProps {}
export interface TreeViewBranchContentProps
  extends TreeViewBranchContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

interface VisibilityProps {
  hidden?: boolean
  'data-state'?: string
}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { Collapsible } from '../collapsible'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'
import { createSplitProps } from '../create-split-props'

const splitVisibilityProps = createSplitProps<VisibilityProps>()

defineProps<TreeViewBranchContentProps>()
const treeView = useTreeViewContext()
const ndoeProps = useTreeViewNodePropsContext()

const branchContentProps = computed(() => {
  const contentProps = treeView.value.getBranchContentProps(ndoeProps)
  const [, ownProps] = splitVisibilityProps(contentProps as VisibilityProps, [
    'hidden',
    'data-state',
  ])
  return ownProps
})

useForwardExpose()
</script>

<template>
  <Collapsible.Content v-bind="branchContentProps" :as-child="asChild">
    <slot />
  </Collapsible.Content>
</template>
