<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
</script>

<template>
  <Tooltip.Root>
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Context v-slot="tooltip">
        <Tooltip.Content>This tooltip is open: {{ tooltip.open.toString() }}</Tooltip.Content>
      </Tooltip.Context>
    </Tooltip.Positioner>
  </Tooltip.Root>
</template>
