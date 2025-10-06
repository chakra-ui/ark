<script setup lang="ts">
import { Dialog, useDialog } from '@ark-ui/vue/dialog'

const parentDialog = useDialog()
const childDialog = useDialog()
</script>

<template>
  <button @click="parentDialog.setOpen(true)">Open Parent Dialog</button>

  <Dialog.RootProvider :value="parentDialog">
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Parent Dialog</Dialog.Title>
          <Dialog.Description>
            This is the parent dialog. Open a nested dialog from here to see automatic z-index management via CSS
            variables like --z-index and --layer-index.
          </Dialog.Description>
          <button @click="childDialog.setOpen(true)">Open Nested Dialog</button>
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>

  <Dialog.RootProvider :value="childDialog">
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Nested Dialog</Dialog.Title>
          <Dialog.Description>
            This dialog is nested within the parent. Notice how it layers on top with proper z-index management.
          </Dialog.Description>
          <button @click="parentDialog.setOpen(false)">Close Parent Dialog</button>
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>
</template>
