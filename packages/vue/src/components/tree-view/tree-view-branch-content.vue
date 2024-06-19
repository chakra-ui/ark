<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'

export interface TreeViewBranchContentBaseProps extends PolymorphicProps {}
export interface TreeViewBranchContentProps
  extends TreeViewBranchContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
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
