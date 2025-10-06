<script setup lang="ts">
import { Dialog, useDialog } from '@ark-ui/vue/dialog'
import { XIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const formContent = ref('')

const confirmDialog = useDialog()
const parentDialog = useDialog({
  onOpenChange: (details) => {
    if (!details.open && formContent.value.trim()) {
      confirmDialog.setOpen(true)
    }
  },
})

const handleConfirmClose = () => {
  confirmDialog.setOpen(false)
  parentDialog.setOpen(false)
  formContent.value = ''
}
</script>

<template>
  <button @click="parentDialog.setOpen(true)">Open Form</button>

  <Dialog.RootProvider :value="parentDialog">
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Edit Content</Dialog.Title>
          <Dialog.Description>
            Make changes to your content. If you have unsaved changes, you'll be asked to confirm before closing.
          </Dialog.Description>
          <textarea v-model="formContent" placeholder="Enter some text..." rows="4" style="width: 100%" />
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>

  <Dialog.RootProvider :value="confirmDialog">
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Unsaved Changes</Dialog.Title>
          <Dialog.Description>
            You have unsaved changes. Are you sure you want to close without saving?
          </Dialog.Description>
          <div>
            <button @click="confirmDialog.setOpen(false)">Keep Editing</button>
            <button @click="handleConfirmClose">Discard Changes</button>
          </div>
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.RootProvider>
</template>
