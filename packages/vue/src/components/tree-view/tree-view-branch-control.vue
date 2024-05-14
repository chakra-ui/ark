<script lang="ts">
import type { PolymorphicProps } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'

export interface TreeViewBranchControlProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

defineProps<TreeViewBranchControlProps>()
const treeView = useTreeViewContext()
const branchProps = useTreeViewBranchContext()
</script>

<template>
  <ark.div v-bind="treeView.getBranchControlProps(branchProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
