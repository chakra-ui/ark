<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface TreeViewTreeProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

defineProps<TreeViewTreeProps>()
const treeView = useTreeViewContext()
</script>

<template>
  <ark.ul v-bind="treeView.treeProps" :as-child="asChild">
    <slot />
  </ark.ul>
</template>