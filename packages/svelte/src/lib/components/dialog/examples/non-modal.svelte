<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { XIcon } from 'lucide-svelte'
  import { Portal } from '@ark-ui/svelte/portal'
</script>

<Dialog.Root modal={false}>
  <Dialog.Trigger>Open Non-Modal Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Non-Modal Dialog</Dialog.Title>
        <Dialog.Description>
          This dialog allows interaction with elements outside. You can click buttons, select text,
          and interact with the page behind it.
        </Dialog.Description>
        <Dialog.CloseTrigger>
      <XIcon />
      </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
