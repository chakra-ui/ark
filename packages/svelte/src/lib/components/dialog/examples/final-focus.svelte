<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { Portal } from '@ark-ui/svelte/portal'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/dialog.module.css'

  let buttonRef: HTMLButtonElement
</script>

<button bind:this={buttonRef} class={button.Root}>Focus Target</button>
<Dialog.Root finalFocusEl={() => buttonRef}>
  <Dialog.Trigger class={button.Root}>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop class={styles.Backdrop} />
    <Dialog.Positioner class={styles.Positioner}>
      <Dialog.Content class={styles.Content}>
        <Dialog.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <Dialog.Title class={styles.Title}>Custom Focus Return</Dialog.Title>
        <Dialog.Description class={styles.Description}>
          When this dialog closes, focus will return to the "Focus Target" button instead of the trigger.
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
