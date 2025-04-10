<script setup lang="ts">
import { Popover, usePopover } from '@ark-ui/vue/popover'

const popover = usePopover()
</script>

<template>
  <button @click="popover.setOpen(true)">Open</button>

  <Popover.RootProvider :value="popover">
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
  </Popover.RootProvider>
</template>
