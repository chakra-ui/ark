<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'
</script>

<template>
  <Dialog.Root lazyMount unmountOnExit>
    <Dialog.Trigger :class="button.Root">Open Dialog</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Lazy Mounted Dialog</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            This dialog content is only mounted when opened and unmounted when closed.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
