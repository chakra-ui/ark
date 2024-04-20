<script setup lang="ts">
import { ref } from 'vue'
import { Popover } from '../..'

const open = ref(false)
</script>

<template>
  <Popover.Root>
    <Popover.Trigger>
      Click Me <Popover.Indicator>{{ '>' }}</Popover.Indicator>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
