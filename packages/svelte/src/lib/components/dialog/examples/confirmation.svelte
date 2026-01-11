<script lang="ts">
  import { Dialog, useDialog } from '@ark-ui/svelte/dialog'
  import { Portal } from '@ark-ui/svelte/portal'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/dialog.module.css'

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

<button class={button.Root} onclick={() => parentDialog().setOpen(true)}>Open Form</button>

<Dialog.RootProvider value={parentDialog}>
  <Portal>
    <Dialog.Backdrop class={styles.Backdrop} />
    <Dialog.Positioner class={styles.Positioner}>
      <Dialog.Content class={styles.Content}>
        <Dialog.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <Dialog.Title class={styles.Title}>Edit Content</Dialog.Title>
        <Dialog.Description class={styles.Description}>
          Make changes to your content. You'll be asked to confirm if you have unsaved changes.
        </Dialog.Description>
        <div class={styles.Body}>
          <textarea bind:value={formContent} placeholder="Enter some text..." rows={4}></textarea>
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.RootProvider>

<Dialog.RootProvider value={confirmDialog}>
  <Portal>
    <Dialog.Backdrop class={styles.Backdrop} />
    <Dialog.Positioner class={styles.Positioner}>
      <Dialog.Content class={styles.Content}>
        <Dialog.Title class={styles.Title}>Unsaved Changes</Dialog.Title>
        <Dialog.Description class={styles.Description}>
          You have unsaved changes. Are you sure you want to discard them?
        </Dialog.Description>
        <div class={styles.Actions}>
          <button class={button.Root} onclick={() => confirmDialog().setOpen(false)}>Keep Editing</button>
          <button class={button.Root} onclick={handleConfirmClose}>Discard</button>
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.RootProvider>
