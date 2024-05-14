<script setup lang="ts">
import { Tooltip } from '../'
</script>
<template>
  <Tooltip.Root :openDelay="0" :closeDelay="0">
    <Tooltip.Trigger>hover me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Arrow>
        <Tooltip.ArrowTip />
      </Tooltip.Arrow>
      <Tooltip.Content>content</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
</template>
