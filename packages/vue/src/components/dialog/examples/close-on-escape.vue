<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

const handleEscapeKeyDown = (e: KeyboardEvent) => {
  e.preventDefault()
  alert('Escape key pressed but dialog stays open')
}
</script>

<template>
  <Dialog.Root :close-on-escape="false" :on-escape-key-down="handleEscapeKeyDown">
    <Dialog.Trigger :class="button.Root">Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Escape Disabled</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            This dialog will not close when pressing the Escape key. Use the close button instead.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
