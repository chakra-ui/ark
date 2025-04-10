<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewBranchControlBaseProps extends PolymorphicProps {}
export interface TreeViewBranchControlProps
  extends TreeViewBranchControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

defineProps<TreeViewBranchControlProps>()
const treeView = useTreeViewContext()
const ndoeProps = useTreeViewNodePropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="treeView.getBranchControlProps(ndoeProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
