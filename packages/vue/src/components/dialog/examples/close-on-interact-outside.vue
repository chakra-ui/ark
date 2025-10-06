<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'

const handleInteractOutside = (e: CustomEvent) => {
  const target = e.detail.target as HTMLElement
  if (target.closest('[data-allow-close]')) {
    return
  }
  e.preventDefault()
}
</script>

<template>
  <Dialog.Root :close-on-interact-outside="false" :on-interact-outside="handleInteractOutside">
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Custom Close Behavior</Dialog.Title>
          <Dialog.Description>
            This dialog will not close when clicking outside. Try clicking the backdrop or pressing Escape to see that
            it stays open. Only the close button will dismiss it.
          </Dialog.Description>
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
