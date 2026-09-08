<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const emit = defineEmits<{
  clickParent: []
  clickChild: []
}>()
</script>

<template>
  <ark.div data-testid="parent" as-child @click="emit('clickParent')">
    <ark.span data-testid="child" @click="emit('clickChild')" />
  </ark.div>
</template>
