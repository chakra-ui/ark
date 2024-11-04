<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewItemIndicatorBaseProps extends PolymorphicProps {}
export interface TreeViewItemIndicatorProps
  extends TreeViewItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

defineProps<TreeViewItemIndicatorProps>()

const treeView = useTreeViewContext()
const nodeProps = useTreeViewNodePropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="treeView.getItemIndicatorProps(nodeProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
