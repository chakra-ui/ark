<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'

export interface TreeViewBranchControlBaseProps extends PolymorphicProps {}
export interface TreeViewBranchControlProps
  extends TreeViewBranchControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useForwardExpose } from '../../utils'

defineProps<TreeViewBranchControlProps>()
const treeView = useTreeViewContext()
const branchProps = useTreeViewBranchContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="treeView.getBranchControlProps(branchProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
