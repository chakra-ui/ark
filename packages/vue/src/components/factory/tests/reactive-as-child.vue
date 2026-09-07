<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

defineProps<{
  parentClass: string
}>()
</script>

<template>
  <ark.div :class="parentClass" as-child>
    <span data-testid="child" class="child">Ark UI</span>
  </ark.div>
</template>
