<script lang="ts">
  import { Dialog, useDialog } from '@ark-ui/svelte/dialog'
  import { Portal } from '@ark-ui/svelte/portal'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/dialog.module.css'

  const id = $props.id()

  const parentDialog = useDialog({ id: `${id}-parent` })
  const childDialog = useDialog({ id: `${id}-child` })
</script>

<button class={button.Root} onclick={() => parentDialog().setOpen(true)}>Open Parent Dialog</button>

<Dialog.RootProvider value={parentDialog}>
  <Portal>
    <Dialog.Backdrop class={styles.Backdrop} />
    <Dialog.Positioner class={styles.Positioner}>
      <Dialog.Content class={styles.Content}>
        <Dialog.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <Dialog.Title class={styles.Title}>Parent Dialog</Dialog.Title>
        <Dialog.Description class={styles.Description}>
          This is the parent dialog. Open a nested dialog from here.
        </Dialog.Description>
        <div class={styles.Actions}>
          <button class={button.Root} onclick={() => childDialog().setOpen(true)}>Open Nested</button>
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.RootProvider>

<Dialog.RootProvider value={childDialog}>
  <Portal>
    <Dialog.Backdrop class={styles.Backdrop} />
    <Dialog.Positioner class={styles.Positioner}>
      <Dialog.Content class={styles.Content}>
        <Dialog.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <Dialog.Title class={styles.Title}>Nested Dialog</Dialog.Title>
        <Dialog.Description class={styles.Description}>
          This is a nested dialog with proper z-index layering.
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.RootProvider>
