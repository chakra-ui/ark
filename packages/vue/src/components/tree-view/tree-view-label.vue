<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewLabelBaseProps extends PolymorphicProps {}
export interface TreeViewLabelProps
  extends TreeViewLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

defineProps<TreeViewLabelProps>()
const treeView = useTreeViewContext()

useForwardExpose()
</script>

<template>
  <ark.h3 v-bind="treeView.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.h3>
</template>
