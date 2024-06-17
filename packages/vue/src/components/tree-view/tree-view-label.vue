<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewLabelBaseProps extends PolymorphicProps {}
export interface TreeViewLabelProps
  extends TreeViewLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

defineProps<TreeViewLabelProps>()
const treeView = useTreeViewContext()
</script>

<template>
  <ark.label v-bind="treeView.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
