<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface TreeViewBranchTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

defineProps<TreeViewBranchTextProps>()
const treeView = useTreeViewContext()
const branchProps = useTreeViewBranchContext()
</script>

<template>
  <ark.span v-bind="treeView.getBranchTextProps(branchProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
