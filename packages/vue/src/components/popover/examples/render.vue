<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger #render="{ props, state }">
      <button type="button" v-bind="props">{{ state.open ? 'Close' : 'Open' }} Popover</button>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>Content</Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
