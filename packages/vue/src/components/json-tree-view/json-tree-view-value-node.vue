<script setup lang="ts">
import type { JsonNodeHastElement } from '@zag-js/json-tree-utils'

interface JsonTreeViewValueNodeProps {
  node: JsonNodeHastElement
}

defineProps<JsonTreeViewValueNodeProps>()

defineSlots<{
  default(props: { node: JsonNodeHastElement }): unknown
}>()
</script>

<template>
  <template v-if="node.type === 'text'">
    {{ node.value }}
  </template>
  <component
    v-else
    :is="node.tagName"
    :data-root="node.properties.root ? '' : undefined"
    :data-type="node.properties.nodeType"
    :data-kind="node.properties.kind"
  >
    <JsonTreeViewValueNode v-for="(child, index) in node.children" :key="index" :node="child">
      <template #default="{ node: childNode }">
        <slot :node="childNode" />
      </template>
    </JsonTreeViewValueNode>
  </component>
</template>
