<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseTreeViewReturn } from './use-tree-view'

interface RootProviderProps {
  value: UnwrapRef<UseTreeViewReturn>
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

const props = defineProps<TreeViewRootProviderProps>()
const treeView = computed(() => props.value)

TreeViewProvider(treeView)
</script>

<template>
  <ark.div v-bind="treeView.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
