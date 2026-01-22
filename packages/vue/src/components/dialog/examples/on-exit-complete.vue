<script setup lang="ts">
import { Dialog, useDialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'

const dialog = useDialog()

function handleExitComplete(from: string) {
  console.log('on exit complete', from)
}
</script>

<template>
  <Dialog.Root @exit-complete="() => handleExitComplete('root')">
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>

  <button @click="dialog.setOpen(true)">Open Root Provider</button>
  <Dialog.RootProvider
    :value="dialog"
    immediate
    lazy-mount
    unmount-on-exit
    skip-animation-on-mount
    @exit-complete="() => handleExitComplete('root-provider')"
  >
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>
</template>
