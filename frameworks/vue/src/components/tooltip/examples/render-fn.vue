<script setup lang="ts">
import { ref } from 'vue'
import { Tooltip } from '../..'

const isOpen = ref(false)
</script>

<template>
  <Tooltip.Root v-slot="{ isOpen }">
    <Tooltip.Trigger>Hover Me, isOpen {{ isOpen.toString() }}</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>This tooltip is open: {{ isOpen.toString() }}</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</template>
