<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const emit = defineEmits<{
  clickParent: []
  clickChild: []
}>()
</script>

<template>
  <ark.div as-child @click="emit('clickParent')">
    <button type="button" data-testid="child" @click="emit('clickChild')" />
  </ark.div>
</template>
