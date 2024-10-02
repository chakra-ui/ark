<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Context v-slot="popover">
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description: {{ popover.open.toString() }}</Popover.Description>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Context>
    </Popover.Positioner>
  </Popover.Root>
</template>
