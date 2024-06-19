<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewBranchTriggerBaseProps extends PolymorphicProps {}
export interface TreeViewBranchTriggerProps
  extends TreeViewBranchTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
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
  <ark.div v-bind="treeView.getBranchTriggerProps(branchProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
