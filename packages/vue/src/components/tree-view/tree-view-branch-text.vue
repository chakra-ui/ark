<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewBranchTextBaseProps extends PolymorphicProps {}
export interface TreeViewBranchTextProps
  extends TreeViewBranchTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'
import { useForwardExpose } from '../../utils'

defineProps<TreeViewBranchTextProps>()

const treeView = useTreeViewContext()
const branchProps = useTreeViewBranchContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="treeView.getBranchTextProps(branchProps)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
