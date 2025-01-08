<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewTreeBaseProps extends PolymorphicProps {}
export interface TreeViewTreeProps
  extends TreeViewTreeBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useForwardExpose } from '../../utils'

defineProps<TreeViewTreeProps>()
const treeView = useTreeViewContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="treeView.getTreeProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
