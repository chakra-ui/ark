<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface TreeViewBranchTriggerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

defineProps<TreeViewBranchTriggerProps>()
const treeView = useTreeViewContext()
const branchProps = useTreeViewBranchContext()
</script>

<template>
  <ark.button v-bind="treeView.getBranchTriggerProps(branchProps)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
