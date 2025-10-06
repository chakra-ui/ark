<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { XIcon } from 'lucide-svelte'
  import { Portal } from '@ark-ui/svelte/portal'
</script>

<Dialog.Root>
  <Dialog.Context>
    {#snippet children(dialog)}
      <Dialog.Trigger>{dialog().open ? 'Close' : 'Open'} Dialog</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Dialog State: {dialog().open ? 'Open' : 'Closed'}</Dialog.Title>
            <Dialog.Description>This example uses a render function to access dialog state.</Dialog.Description>
            <Dialog.CloseTrigger>
      <XIcon />
      </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    {/snippet}
  </Dialog.Context>
</Dialog.Root>
