<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { XIcon } from 'lucide-svelte'
  import { Portal } from '@ark-ui/svelte/portal'

  let finalRef: HTMLButtonElement
</script>

<button type="button" bind:this={finalRef}>I will receive focus when dialog closes</button>
<Dialog.Root finalFocusEl={() => finalRef}>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Description>
          When this dialog closes, focus will return to the button above instead of the trigger.
        </Dialog.Description>
        <Dialog.CloseTrigger>
          <XIcon />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
