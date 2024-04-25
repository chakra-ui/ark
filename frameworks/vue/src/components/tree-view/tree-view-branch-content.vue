<script lang="ts">
import type { PolymorphicProps } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'

export interface TreeViewBranchContentProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

defineProps<TreeViewBranchContentProps>()
const treeView = useTreeViewContext()
const branchProps = useTreeViewBranchContext()
</script>

<template>
  <ark.ul v-bind="treeView.getBranchContentProps(branchProps)" :as-child="asChild">
    <slot />
  </ark.ul>
</template>
