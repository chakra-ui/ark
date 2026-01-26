<script lang="ts">
  import { Dialog, useDialog } from '@ark-ui/svelte/dialog'
  import { Portal } from '@ark-ui/svelte/portal'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/dialog.module.css'

  const id = $props.id()

  const dialog = useDialog({ id })
</script>

<button class={button.Root} onclick={() => dialog().setOpen(true)}>Open</button>

<Dialog.RootProvider value={dialog}>
  <Portal>
    <Dialog.Backdrop class={styles.Backdrop} />
    <Dialog.Positioner class={styles.Positioner}>
      <Dialog.Content class={styles.Content}>
        <Dialog.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <Dialog.Title class={styles.Title}>Account Settings</Dialog.Title>
        <Dialog.Description class={styles.Description}>
          Manage your account preferences and security options.
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.RootProvider>
