<script lang="ts">
  import { Dialog, useDialog } from '@ark-ui/svelte/dialog'
  import { XIcon } from 'lucide-svelte'
  import { Portal } from '@ark-ui/svelte/portal'

  const id = $props.id()

  const parentDialog = useDialog({ id: `${id}-parent` })
  const childDialog = useDialog({ id: `${id}-child` })
</script>

<button onclick={() => parentDialog().setOpen(true)}>Open Parent Dialog</button>

<Dialog.RootProvider value={parentDialog}>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Parent Dialog</Dialog.Title>
        <Dialog.Description>
          This is the parent dialog. Open a nested dialog from here to see automatic z-index
          management via CSS variables like --z-index and --layer-index.
        </Dialog.Description>
        <button onclick={() => childDialog().setOpen(true)}>Open Nested Dialog</button>
        <Dialog.CloseTrigger>
      <XIcon />
      </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.RootProvider>

<Dialog.RootProvider value={childDialog}>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Nested Dialog</Dialog.Title>
        <Dialog.Description>
          This dialog is nested within the parent. Notice how it layers on top with proper
          z-index management.
        </Dialog.Description>
        <button onclick={() => parentDialog().setOpen(false)}>Close Parent Dialog</button>
        <Dialog.CloseTrigger>
      <XIcon />
      </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.RootProvider>
