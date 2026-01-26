<script lang="ts">
import type { JsonNode } from '@zag-js/json-tree-utils'
import type { TreeViewRootProviderProps } from '../tree-view'

export interface JsonTreeViewRootProviderProps extends TreeViewRootProviderProps<JsonNode> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { TreeViewRootProvider } from '../tree-view'
import { JsonTreeViewPropsProvider } from './json-tree-view-props-context'
import type { UseJsonTreeViewReturn } from './use-json-tree-view'

const props = defineProps<JsonTreeViewRootProviderProps>()

const jsonTreeView = props.value as unknown as UseJsonTreeViewReturn

const treeView = computed(() => {
  const { options: _, ...rest } = jsonTreeView.value
  return rest
})

JsonTreeViewPropsProvider(computed(() => jsonTreeView.value.options))
</script>

<template>
  <TreeViewRootProvider data-scope="json-tree-view" :value="treeView">
    <slot />
  </TreeViewRootProvider>
</template>
