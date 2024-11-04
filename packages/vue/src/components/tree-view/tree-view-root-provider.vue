<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { TreeNode } from '../collection'
import type { PolymorphicProps } from '../factory'
import type { UseTreeViewReturn } from './use-tree-view'

interface RootProviderProps<T extends TreeNode> {
  value: UnwrapRef<UseTreeViewReturn<T>>
}

export interface TreeViewRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface TreeViewRootProviderProps
  extends TreeViewRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { TreeViewProvider } from './use-tree-view-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<TreeViewRootProviderProps>()
const treeView = computed(() => props.value)

TreeViewProvider(treeView)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="treeView.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
