<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { Portal } from '@ark-ui/svelte/portal'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/dialog.module.css'

  const handleEscapeKeyDown = (e: KeyboardEvent) => {
    e.preventDefault()
    alert('Escape key pressed but dialog stays open')
  }
</script>

<Dialog.Root closeOnEscape={false} onEscapeKeyDown={handleEscapeKeyDown}>
  <Dialog.Trigger class={button.Root}>Open Dialog</Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop class={styles.Backdrop} />
    <Dialog.Positioner class={styles.Positioner}>
      <Dialog.Content class={styles.Content}>
        <Dialog.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <Dialog.Title class={styles.Title}>Escape Disabled</Dialog.Title>
        <Dialog.Description class={styles.Description}>
          This dialog will not close when pressing the Escape key. Use the close button instead.
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
