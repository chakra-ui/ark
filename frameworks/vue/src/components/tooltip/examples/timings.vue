<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from '../..'

const isOpen = ref(false)
</script>

<template>
  <Tooltip.Root :closeDelay="0" :openDelay="0">
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</template>
