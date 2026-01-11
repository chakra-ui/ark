<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { Portal } from '@ark-ui/svelte/portal'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/dialog.module.css'

  let inputRef: HTMLInputElement
</script>

<Dialog.Root initialFocusEl={() => inputRef}>
  <Dialog.Trigger class={button.Root}>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop class={styles.Backdrop} />
    <Dialog.Positioner class={styles.Positioner}>
      <Dialog.Content class={styles.Content}>
        <Dialog.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <Dialog.Title class={styles.Title}>Edit Profile</Dialog.Title>
        <Dialog.Description class={styles.Description}>
          The name input will be focused when this dialog opens.
        </Dialog.Description>
        <div class={styles.Body}>
          <input bind:this={inputRef} type="text" placeholder="Enter your name" />
          <input type="email" placeholder="Enter your email" />
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
