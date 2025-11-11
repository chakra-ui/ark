<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { XIcon } from 'lucide-svelte'
  import { Portal } from '@ark-ui/svelte/portal'

  let inputRef: HTMLInputElement
</script>

<Dialog.Root initialFocusEl={() => inputRef}>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Title>Edit Profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. The first input will be focused when the dialog opens.
        </Dialog.Description>
        <input bind:this={inputRef} type="text" placeholder="Enter your name..." />
        <input type="email" placeholder="Enter your email..." />
        <Dialog.CloseTrigger>
          <XIcon />
        </Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
