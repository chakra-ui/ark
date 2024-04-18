<script setup lang="ts">
import { useCollapsibleContext } from './use-collapsible-context'

defineSlots<{
  default(): any
}>()

const collapsible = useCollapsibleContext()
</script>

<template>
  <div v-bind="collapsible.contentProps" v-if="!collapsible.isUnmounted">
    <slot />
  </div>
</template>