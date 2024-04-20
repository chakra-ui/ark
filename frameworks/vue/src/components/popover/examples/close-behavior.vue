<script setup lang="ts">
import { ref } from 'vue'
import { Popover } from '../..'

const open = ref(false)
</script>

<template>
  <Popover.Root :closeOnEsc="false" :closeOnInteractOutside="false">
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
