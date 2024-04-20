<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from '../..'

const isOpen = ref(false)
</script>

<template>
  <Tooltip.Root>
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</template>
