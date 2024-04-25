<script lang="ts">
import type { RootEmits, RootProps } from './tree-view.types'

export interface TreeViewRootProps extends RootProps, PolymorphicProps {}
export interface TreeViewRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useTreeView } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

const props = defineProps<TreeViewRootProps>()
const emits = defineEmits<TreeViewRootEmits>()

const treeView = useTreeView(props, emits)
TreeViewProvider(treeView)
</script>

<template>
  <ark.div v-bind="treeView.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
