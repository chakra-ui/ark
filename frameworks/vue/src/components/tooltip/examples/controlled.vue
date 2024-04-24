<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from '../..'

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
