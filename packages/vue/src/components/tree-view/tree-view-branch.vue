<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { ItemProps } from './use-tree-view-branch-context'

export interface TreeViewBranchBaseProps extends ItemProps, PolymorphicProps {}
export interface TreeViewBranchProps
  extends TreeViewBranchBaseProps,
    /**
     * @vue-ignore̊
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { TreeViewBranchProvider } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider, useTreeViewDepthContext } from './use-tree-view-depth-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<TreeViewBranchProps>()

const treeView = useTreeViewContext()
const depth = useTreeViewDepthContext()
const branchProps = computed(() => ({ ...props, depth }))

TreeViewBranchProvider(branchProps.value)
TreeViewDepthProvider(depth + 1)

useForwardExpose()
</script>

<template>
  <ark.li v-bind="treeView.getBranchProps(branchProps)" :as-child="asChild">
    <slot />
  </ark.li>
</template>
