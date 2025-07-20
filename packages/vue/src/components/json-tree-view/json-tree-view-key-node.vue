<template>
  <span data-kind="key" :data-non-enumerable="node.isNonEnumerable ? '' : undefined">
    {{ showQuotes ? `"${key}"` : key }}
  </span>
  <span data-kind="colon">:</span>
</template>

<script setup lang="ts">
import { type JsonNode, keyPathToKey } from '@zag-js/json-tree-utils'
import { computed } from 'vue'

interface JsonTreeViewKeyNodeProps {
  /**
   * The node to render.
   */
  node: JsonNode
  /**
   * Whether to show quotes on the key.
   */
  showQuotes?: boolean
}

const props = defineProps<JsonTreeViewKeyNodeProps>()

const key = computed(() => keyPathToKey(props.node.keyPath))
</script>
