<script setup lang="ts">
import { useCollapsibleContext } from './use-collapsible-context'

const collapsible = useCollapsibleContext()
</script>

<template>
  <div v-bind="collapsible.contentProps">
  <slot></slot>
  </div>
</template>