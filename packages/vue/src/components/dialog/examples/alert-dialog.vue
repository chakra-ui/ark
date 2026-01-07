<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'
</script>

<template>
  <Dialog.Root role="alertdialog">
    <Dialog.Trigger :class="button.Root">Delete Account</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Are you absolutely sure?</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </Dialog.Description>
          <div :class="styles.Actions">
            <Dialog.CloseTrigger :class="button.Root">Cancel</Dialog.CloseTrigger>
            <button type="button" :class="button.Root">Delete Account</button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
