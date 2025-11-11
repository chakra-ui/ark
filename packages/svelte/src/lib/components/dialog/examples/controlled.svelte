<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { XIcon } from 'lucide-svelte'
  import { Portal } from '@ark-ui/svelte/portal'

  let open = $state(false)
</script>

<button type="button" onclick={() => (open = !open)}>Toggle</button>
<Dialog.Root bind:open>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Controlled Dialog</Dialog.Title>
        <Dialog.Description>This dialog's open state is controlled externally.</Dialog.Description>
        <Dialog.CloseTrigger>
          <XIcon />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
