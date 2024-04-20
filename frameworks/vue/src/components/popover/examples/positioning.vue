<script setup lang="ts">
import { Popover } from '../..'
</script>

<template>
  <Popover.Root
    :positioning="{
      placement: 'left-start',
      gutter: 16,
      offset: { mainAxis: 12, crossAxis: 12 },
    }"
  >
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
        <Popover.CloseTrigger>Close</Popover.CloseTrigger>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
