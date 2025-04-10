<script setup lang="ts">
import { Tooltip, useTooltip } from '@ark-ui/vue/tooltip'

const tooltip = useTooltip()
</script>

<template>
  <button @click="tooltip.setOpen(true)">Open</button>

  <Tooltip.RootProvider :value="tooltip">
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.RootProvider>
</template>
