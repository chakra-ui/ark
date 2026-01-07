<script setup lang="ts">
import { Dialog, useDialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

const formContent = ref('')

const confirmDialog = useDialog()
const parentDialog = useDialog({
  onOpenChange: (details) => {
    if (!details.open && formContent.value.trim()) {
      confirmDialog.value.setOpen(true)
    }
  },
})

const handleConfirmClose = () => {
  confirmDialog.value.setOpen(false)
  parentDialog.value.setOpen(false)
  formContent.value = ''
}
</script>

<template>
  <button :class="button.Root" @click="parentDialog.setOpen(true)">Open Form</button>

  <Dialog.RootProvider :value="parentDialog">
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.CloseTrigger :class="styles.CloseTrigger">
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title :class="styles.Title">Edit Content</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            Make changes to your content. You'll be asked to confirm if you have unsaved changes.
          </Dialog.Description>
          <div :class="styles.Body">
            <textarea v-model="formContent" placeholder="Enter some text..." rows="4"></textarea>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>

  <Dialog.RootProvider :value="confirmDialog">
    <Teleport to="body">
      <Dialog.Backdrop :class="styles.Backdrop" />
      <Dialog.Positioner :class="styles.Positioner">
        <Dialog.Content :class="styles.Content">
          <Dialog.Title :class="styles.Title">Unsaved Changes</Dialog.Title>
          <Dialog.Description :class="styles.Description">
            You have unsaved changes. Are you sure you want to discard them?
          </Dialog.Description>
          <div :class="styles.Actions">
            <button :class="button.Root" @click="confirmDialog.setOpen(false)">Keep Editing</button>
            <button :class="button.Root" @click="handleConfirmClose">Discard</button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>
</template>
