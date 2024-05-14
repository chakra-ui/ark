<script setup lang="ts">
import { Teleport } from 'vue'
import { Dialog } from '../..'
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
    <Dialog.Context v-slot="dialog">
      <p>Dialog is {{ dialog.open ? 'open' : 'closed' }}</p>
    </Dialog.Context>
  </Dialog.Root>
</template>
