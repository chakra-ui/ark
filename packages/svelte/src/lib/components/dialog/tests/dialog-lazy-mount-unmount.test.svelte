<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { Portal } from '@ark-ui/svelte/portal'
</script>

<Dialog.Root lazyMount unmountOnExit>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop data-testid="dialog-backdrop" />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Title</Dialog.Title>
        <Dialog.CloseTrigger>Close Dialog</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
