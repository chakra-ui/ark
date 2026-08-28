<script lang="ts">
import type { JsonNode } from '@zag-js/json-tree-utils'
import type { PropTypes } from '@zag-js/vue'
import type * as treeView from '@zag-js/tree-view'
import type { TreeViewRootProviderProps } from '../tree-view/index.ts'
import type { JsonTreeViewOptions } from './json-tree-view-props-context.ts'

export interface JsonTreeViewRootProviderProps extends Omit<TreeViewRootProviderProps<JsonNode>, 'value'> {
  value: treeView.Api<PropTypes, JsonNode> & { options: JsonTreeViewOptions }
}
</script>

<script setup lang="ts">
import { computed, toValue } from 'vue'
import { TreeViewRootProvider } from '../tree-view/index.ts'
import { JsonTreeViewPropsProvider } from './json-tree-view-props-context.ts'

const props = defineProps<JsonTreeViewRootProviderProps>()

const api = computed(() => toValue(props.value))

const treeView = computed(() => {
  const { options: _, ...rest } = api.value
  return rest
})

const rootProps = computed(() => {
  const { value: _, ...rest } = props
  return rest
})

JsonTreeViewPropsProvider(computed(() => api.value.options))
</script>

<template>
  <TreeViewRootProvider data-scope="json-tree-view" v-bind="rootProps" :value="treeView">
    <slot />
  </TreeViewRootProvider>
</template>
