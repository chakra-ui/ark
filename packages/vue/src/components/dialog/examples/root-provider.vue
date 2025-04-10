<script setup lang="ts">
import { Dialog, useDialog } from '@ark-ui/vue/dialog'

const dialog = useDialog()
</script>

<template>
  <button @click="dialog.setOpen(true)">Open</button>

  <Dialog.RootProvider :value="dialog">
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
  </Dialog.RootProvider>
</template>
