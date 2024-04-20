<script setup lang="ts">
import { Teleport } from 'vue'
import { Dialog } from '../..'
</script>

<template>
  <Dialog.Root v-slot="api">
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
    <p>Dialog is {{ api.isOpen ? 'open' : 'closed' }}</p>
  </Dialog.Root>
</template>
