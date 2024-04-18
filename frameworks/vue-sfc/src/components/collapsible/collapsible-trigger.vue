<script setup lang="ts">
import { useCollapsibleContext } from './use-collapsible-context'

const collapsible = useCollapsibleContext()
</script>

<template>
  <button v-bind="collapsible.triggerProps">
  <slot></slot>
  </button>
</template>