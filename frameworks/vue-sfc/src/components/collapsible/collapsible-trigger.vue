<script setup lang="ts">
import { useCollapsibleContext } from './use-collapsible-context'

defineSlots<{
  default(): any
}>()

const collapsible = useCollapsibleContext()
</script>

<template>
  <button v-bind="collapsible.triggerProps">
  <slot />
  </button>
</template>