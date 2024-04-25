<script lang="ts">
import type { PolimoprhicProps } from '../factory'
import { useTreeViewItemPropsContext } from './use-tree-view-item-props-context'

export interface TreeViewItemIndicatorProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory';
import { useTreeViewContext } from './use-tree-view-context';

defineProps<TreeViewItemIndicatorProps>()
const treeView = useTreeViewContext()
const itemProps = useTreeViewItemPropsContext()
</script>

<template>
  <ark.div v-bind="treeView.getItemIndicatorProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>