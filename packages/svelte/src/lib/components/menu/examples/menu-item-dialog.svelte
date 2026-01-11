<script lang="ts">
  import { Dialog } from '@ark-ui/svelte/dialog'
  import { Menu } from '@ark-ui/svelte/menu'
  import { Portal } from '@ark-ui/svelte/portal'
  import { ChevronDownIcon, XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import dialog from 'styles/dialog.module.css'
  import styles from 'styles/menu.module.css'

  let dialogOpen = $state(false)
</script>

<Menu.Root>
  <Menu.Trigger class={styles.Trigger}>
    Actions
    <Menu.Indicator class={styles.Indicator}>
      <ChevronDownIcon />
    </Menu.Indicator>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        <Menu.Item class={styles.Item} value="edit">Edit</Menu.Item>
        <Menu.Item class={styles.Item} value="duplicate">Duplicate</Menu.Item>
        <Menu.Separator class={styles.Separator} />
        <Menu.Item class={styles.Item} value="delete" onclick={() => (dialogOpen = true)}>Delete...</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>

<Dialog.Root bind:open={dialogOpen} role="alertdialog">
  <Portal>
    <Dialog.Backdrop class={dialog.Backdrop} />
    <Dialog.Positioner class={dialog.Positioner}>
      <Dialog.Content class={dialog.Content}>
        <Dialog.Title class={dialog.Title}>Confirm Delete</Dialog.Title>
        <Dialog.Description class={dialog.Description}>
          Are you sure you want to delete this item? This action cannot be undone.
        </Dialog.Description>
        <Dialog.CloseTrigger class={dialog.CloseTrigger}>
          <XIcon />
        </Dialog.CloseTrigger>
        <div class={dialog.Actions}>
          <button class={button.Root} onclick={() => (dialogOpen = false)}>Cancel</button>
          <button class={button.Root} data-variant="solid" onclick={() => (dialogOpen = false)}>Delete</button>
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
