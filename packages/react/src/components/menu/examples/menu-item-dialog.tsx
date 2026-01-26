import { Dialog } from '@ark-ui/react/dialog'
import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { ChevronDownIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import dialog from 'styles/dialog.module.css'
import styles from 'styles/menu.module.css'

export const MenuItemDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <Menu.Root>
        <Menu.Trigger className={styles.Trigger}>
          Actions
          <Menu.Indicator className={styles.Indicator}>
            <ChevronDownIcon />
          </Menu.Indicator>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content className={styles.Content}>
              <Menu.Item className={styles.Item} value="edit">
                Edit
              </Menu.Item>
              <Menu.Item className={styles.Item} value="duplicate">
                Duplicate
              </Menu.Item>
              <Menu.Separator className={styles.Separator} />
              <Menu.Item className={styles.Item} value="delete" onClick={() => setDialogOpen(true)}>
                Delete...
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <Dialog.Root open={dialogOpen} onOpenChange={(e) => setDialogOpen(e.open)} role="alertdialog">
        <Portal>
          <Dialog.Backdrop className={dialog.Backdrop} />
          <Dialog.Positioner className={dialog.Positioner}>
            <Dialog.Content className={dialog.Content}>
              <Dialog.Title className={dialog.Title}>Confirm Delete</Dialog.Title>
              <Dialog.Description className={dialog.Description}>
                Are you sure you want to delete this item? This action cannot be undone.
              </Dialog.Description>
              <Dialog.CloseTrigger className={dialog.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <div className={dialog.Actions}>
                <button className={button.Root} onClick={() => setDialogOpen(false)}>
                  Cancel
                </button>
                <button className={button.Root} data-variant="solid" onClick={() => setDialogOpen(false)}>
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
