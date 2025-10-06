<script lang="ts">
  import { Dialog, useDialog } from '@ark-ui/svelte/dialog'
  import { XIcon } from 'lucide-svelte'
  import { Portal } from '@ark-ui/svelte/portal'

  const id = $props.id()
  let formContent = $state('')

  const confirmDialog = useDialog({ id: `${id}-confirm` })
  const parentDialog = useDialog({
    id: `${id}-parent`,
    onOpenChange: (details) => {
      if (!details.open && formContent.trim()) {
        confirmDialog().setOpen(true)
      }
    },
  })

  const handleConfirmClose = () => {
    confirmDialog().setOpen(false)
    parentDialog().setOpen(false)
    formContent = ''
  }
</script>

<button onclick={() => parentDialog().setOpen(true)}>Open Form</button>

<Dialog.RootProvider value={parentDialog}>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Edit Content</Dialog.Title>
        <Dialog.Description>
          Make changes to your content. If you have unsaved changes, you'll be asked to confirm before closing.
        </Dialog.Description>
        <textarea bind:value={formContent} placeholder="Enter some text..." rows={4} style="width: 100%;"></textarea>
        <Dialog.CloseTrigger>
          <XIcon />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.RootProvider>

<Dialog.RootProvider value={confirmDialog}>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Unsaved Changes</Dialog.Title>
        <Dialog.Description>
          You have unsaved changes. Are you sure you want to close without saving?
        </Dialog.Description>
        <div>
          <button onclick={() => confirmDialog().setOpen(false)}>Keep Editing</button>
          <button onclick={handleConfirmClose}>Discard Changes</button>
        </div>
        <Dialog.CloseTrigger>
          <XIcon />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.RootProvider>
