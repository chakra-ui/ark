<script lang="ts">
  import { Dialog, useDialog } from '@ark-ui/svelte/dialog'
  import { XIcon } from 'lucide-svelte'
  import { Portal } from '@ark-ui/svelte/portal'

  const id = $props.id()

  const dialog = useDialog({ id })
</script>

<button onclick={() => dialog().setOpen(true)}>Open</button>

<Dialog.RootProvider value={dialog}>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Description>Dialog Description</Dialog.Description>
        <Dialog.CloseTrigger>
      <XIcon />
      </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.RootProvider>
