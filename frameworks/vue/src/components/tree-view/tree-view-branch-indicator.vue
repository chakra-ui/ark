<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface TreeViewBranchIndicatorProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory';
import { useTreeViewBranchContext } from './use-tree-view-branch-context';
import { useTreeViewContext } from './use-tree-view-context';

defineProps<TreeViewBranchIndicatorProps>()
const treeView = useTreeViewContext()
const branchProps = useTreeViewBranchContext()
</script>

<template>
  <ark.div v-bind="treeView.getBranchIndicatorProps(branchProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>