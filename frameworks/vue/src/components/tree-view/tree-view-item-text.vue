<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface TreeViewItemTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewItemPropsContext } from './use-tree-view-item-props-context'

defineProps<TreeViewItemTextProps>()
const treeView = useTreeViewContext()
const itemProps = useTreeViewItemPropsContext()
</script>

<template>
  <ark.span v-bind="treeView.getItemTextProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
