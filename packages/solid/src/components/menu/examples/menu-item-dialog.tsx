import { Dialog } from '@ark-ui/solid/dialog'
import { Menu } from '@ark-ui/solid/menu'
import { ChevronDownIcon, XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import dialog from 'styles/dialog.module.css'
import styles from 'styles/menu.module.css'

export const MenuItemDialog = () => {
  const [dialogOpen, setDialogOpen] = createSignal(false)

  return (
    <>
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
              <Menu.Item class={styles.Item} value="edit">
                Edit
              </Menu.Item>
              <Menu.Item class={styles.Item} value="duplicate">
                Duplicate
              </Menu.Item>
              <Menu.Separator class={styles.Separator} />
              <Menu.Item class={styles.Item} value="delete" onClick={() => setDialogOpen(true)}>
                Delete...
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <Dialog.Root open={dialogOpen()} onOpenChange={(e) => setDialogOpen(e.open)} role="alertdialog">
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
                <button class={button.Root} onClick={() => setDialogOpen(false)}>
                  Cancel
                </button>
                <button class={button.Root} data-variant="solid" onClick={() => setDialogOpen(false)}>
                  Delete
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
