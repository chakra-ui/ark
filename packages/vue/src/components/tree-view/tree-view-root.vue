<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './tree-view.types'

export interface TreeViewRootProps
  extends RootProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface TreeViewRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeView } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

const props = withDefaults(defineProps<TreeViewRootProps>(), {
  expandOnClick: undefined,
  typeahead: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<TreeViewRootEmits>()

const treeView = useTreeView(props, emits)
TreeViewProvider(treeView)
</script>

<template>
  <ark.div v-bind="treeView.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
