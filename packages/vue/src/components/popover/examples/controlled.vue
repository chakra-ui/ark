<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Fragment>
    <button @click="() => (open = !open)">toggle</button>
    <Popover.Root v-model:open="open">
      <Popover.Anchor>Anchor</Popover.Anchor>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  </Fragment>
</template>
