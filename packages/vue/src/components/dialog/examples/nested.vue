<script setup lang="ts">
import { Dialog, useDialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

const parentDialog = useDialog()
const childDialog = useDialog()
</script>

<template>
  <button :class="button.Root" @click="parentDialog.setOpen(true)">Open Parent Dialog</button>

  <Dialog.RootProvider :value="parentDialog">
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Parent Dialog</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            This is the parent dialog. Open a nested dialog from here.
          </Dialog.Description>
          <div :class="styles.Actions">
            <button :class="button.Root" @click="childDialog.setOpen(true)">Open Nested</button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>

  <Dialog.RootProvider :value="childDialog">
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Nested Dialog</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            This is a nested dialog with proper z-index layering.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>
</template>
