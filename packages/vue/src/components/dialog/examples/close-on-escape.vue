<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'

const handleEscapeKeyDown = (e: KeyboardEvent) => {
  const hasUnsavedChanges = true
  if (hasUnsavedChanges) {
    e.preventDefault()
    alert('You have unsaved changes. Please save or discard them before closing.')
  }
}
</script>

<template>
  <Dialog.Root :close-on-escape="false" :on-escape-key-down="handleEscapeKeyDown">
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Unsaved Changes</Dialog.Title>
          <Dialog.Description>
            This dialog prevents closing with Escape key. Try pressing Escape to see the warning. Use the close button
            to dismiss.
          </Dialog.Description>
          <textarea placeholder="Type something..." rows="4" style="width: 100%" />
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
