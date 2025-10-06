<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { XIcon } from 'lucide-svelte'
  import { Portal } from '@ark-ui/svelte/portal'

  const handleEscapeKeyDown = (e: KeyboardEvent) => {
    const hasUnsavedChanges = true
    if (hasUnsavedChanges) {
      e.preventDefault()
      alert('You have unsaved changes. Please save or discard them before closing.')
    }
  }
</script>

<Dialog.Root closeOnEscape={false} onEscapeKeyDown={handleEscapeKeyDown}>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Unsaved Changes</Dialog.Title>
        <Dialog.Description>
          This dialog prevents closing with Escape key. Try pressing Escape to see the warning. Use the close button to
          dismiss.
        </Dialog.Description>
        <textarea placeholder="Type something..." rows={4} style="width: 100%;"></textarea>
        <Dialog.CloseTrigger>
          <XIcon />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
