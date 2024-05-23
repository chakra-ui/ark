<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TreeViewTreeProps extends PolymorphicProps, /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

defineProps<TreeViewTreeProps>()
const treeView = useTreeViewContext()
</script>

<template>
  <ark.ul v-bind="treeView.treeProps" :as-child="asChild">
    <slot />
  </ark.ul>
</template>
