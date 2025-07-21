<script setup lang="ts">
import type { JsonNode } from '@zag-js/json-tree-utils'
import { TreeViewRootProvider, type TreeViewRootProviderProps } from '../tree-view'

export interface JsonTreeViewRootProviderProps extends TreeViewRootProviderProps<JsonNode> {}

defineProps<JsonTreeViewRootProviderProps>()
</script>

<template>
  <TreeViewRootProvider data-scope="json-tree-view" v-bind="$props">
    <slot />
  </TreeViewRootProvider>
</template>
