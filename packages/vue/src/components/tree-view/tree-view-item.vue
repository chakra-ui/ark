<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseTreeViewItemPropsContext } from './use-tree-view-item-props-context'

export interface TreeViewItemBaseProps extends UseTreeViewItemPropsContext, PolymorphicProps {}
export interface TreeViewItemProps
  extends TreeViewItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewDepthContext } from './use-tree-view-depth-context'
import { TreeViewItemProvider } from './use-tree-view-item-context'
import { TreeViewItemPropsProvider } from './use-tree-view-item-props-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<TreeViewItemProps>()
const treeView = useTreeViewContext()
const depth = useTreeViewDepthContext()

TreeViewItemProvider(computed(() => treeView.value.getItemState({ ...props, depth })))
TreeViewItemPropsProvider({ ...props, depth })

useForwardExpose()
</script>

<template>
  <ark.li v-bind="treeView.getItemProps({ ...props, depth })" :as-child="asChild">
    <slot />
  </ark.li>
</template>
