<script setup lang="ts">
import type { JsonNodeHastElement } from '@zag-js/json-tree-utils'

interface JsonTreeViewValueNodeProps {
  node: JsonNodeHastElement
}

defineProps<JsonTreeViewValueNodeProps>()

defineSlots<{
  renderValue?(props: { node: JsonNodeHastElement }): unknown
}>()
</script>

<template>
  <template v-if="node.type === 'text'">
    <template v-if="$slots.renderValue">
      <slot name="renderValue" :node="node">{{ node.value }}</slot>
    </template>
    <template v-else>{{ node.value }}</template>
  </template>
  <component
    v-else
    :is="node.tagName"
    :data-root="node.properties.root ? '' : undefined"
    :data-type="node.properties.nodeType"
    :data-kind="node.properties.kind"
  >
    <JsonTreeViewValueNode v-for="(child, index) in node.children" :key="index" :node="child">
      <template #renderValue="{ node: childNode }">
        <slot name="renderValue" :node="childNode" />
      </template>
    </JsonTreeViewValueNode>
  </component>
</template>
