<script lang="ts">
import type { PolimoprhicProps } from '../factory'
import type { ItemProps } from './use-tree-view-branch-context'

export interface TreeViewBranchProps extends PolimoprhicProps, ItemProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { TreeViewBranchProvider } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider, useTreeViewDepthContext } from './use-tree-view-depth-context'

const props = defineProps<TreeViewBranchProps>()

const treeView = useTreeViewContext()
const depth = useTreeViewDepthContext()
const branchProps = computed(() => ({ ...props, depth }))

TreeViewBranchProvider(branchProps.value)
TreeViewDepthProvider(depth + 1)
</script>

<template>
  <ark.div v-bind="treeView.getBranchProps(branchProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
