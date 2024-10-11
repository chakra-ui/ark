<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
        <Popover.CloseTrigger>Close</Popover.CloseTrigger>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
