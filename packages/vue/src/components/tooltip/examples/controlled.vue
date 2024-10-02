<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <button @click="isOpen = !isOpen">Toggle</button>
  <Tooltip.Root :open="isOpen">
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</template>
