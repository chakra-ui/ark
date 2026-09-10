<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-vue-next'
</script>

<template>
  <Popover.Root>
    <Popover.Trigger #render="{ props, state }">
      <button type="button" v-bind="props">
        {{ state.open ? 'Close' : 'Open' }} Popover
        <ChevronUpIcon v-if="state.open" />
        <ChevronDownIcon v-else />
      </button>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>Content</Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
