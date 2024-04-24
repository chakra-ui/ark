<script setup lang="ts">
import { Popover } from '../..'
</script>

<template>
  <Popover.Root portalled>
    <Popover.Trigger>
      Click Me
      <Popover.Indicator>{{ '>' }}</Popover.Indicator>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
