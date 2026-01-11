<script setup lang="ts">
import { Dialog, useDialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

const dialog = useDialog()
</script>

<template>
  <button :class="button.Root" @click="dialog.setOpen(true)">Open</button>

  <Dialog.RootProvider :value="dialog">
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Account Settings</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            Manage your account preferences and security options.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>
</template>
