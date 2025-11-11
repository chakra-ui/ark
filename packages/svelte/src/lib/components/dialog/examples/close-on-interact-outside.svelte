<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { XIcon } from 'lucide-svelte'
  import { Portal } from '@ark-ui/svelte/portal'

  const handleInteractOutside = (e: CustomEvent) => {
    const target = e.detail.target as HTMLElement
    if (target.closest('[data-allow-close]')) {
      return
    }
    e.preventDefault()
  }
</script>

<Dialog.Root closeOnInteractOutside={false} onInteractOutside={handleInteractOutside}>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Custom Close Behavior</Dialog.Title>
        <Dialog.Description>
          This dialog will not close when clicking outside. Try clicking the backdrop or pressing Escape to see that it
          stays open. Only the close button will dismiss it.
        </Dialog.Description>
        <Dialog.CloseTrigger>
          <XIcon />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
