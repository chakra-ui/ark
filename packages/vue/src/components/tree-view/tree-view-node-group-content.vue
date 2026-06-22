<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TreeViewNodeGroupContentBaseProps extends PolymorphicProps {}
export interface TreeViewNodeGroupContentProps
  extends
    TreeViewNodeGroupContentBaseProps,
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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { Collapsible } from '../collapsible/index.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'
import { createSplitProps } from '../create-split-props.ts'

const splitVisibilityProps = createSplitProps<VisibilityProps>()

defineProps<TreeViewNodeGroupContentProps>()
const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

const nodeGroupContentProps = computed(() => {
  const contentProps = treeView.value.getNodeGroupContentProps(nodeProps)
  const [, ownProps] = splitVisibilityProps(contentProps as VisibilityProps, ['hidden', 'data-state'])
  return ownProps
})

useForwardExpose()
</script>

<template>
  <Collapsible.Content v-bind="nodeGroupContentProps" :as-child="asChild">
    <slot />
  </Collapsible.Content>
</template>
