<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'
</script>

<template>
  <Dialog.Root :modal="false">
    <Dialog.Trigger :class="button.Root">Open Non-Modal</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Non-Modal Dialog</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            This dialog allows interaction with elements outside while open.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
