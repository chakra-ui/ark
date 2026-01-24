import { Dialog } from '@ark-ui/react/dialog'
import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { ChevronDownIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import dialog from 'styles/dialog.module.css'
import menu from 'styles/menu.module.css'

export const OpenFromMenu = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Menu.Root>
        <Menu.Trigger className={menu.Trigger}>
          Actions
          <Menu.Indicator className={menu.Indicator}>
            <ChevronDownIcon />
          </Menu.Indicator>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content className={menu.Content}>
              <Menu.Item className={menu.Item} value="edit">
                Edit
              </Menu.Item>
              <Menu.Item className={menu.Item} value="duplicate">
                Duplicate
              </Menu.Item>
              <Menu.Separator className={menu.Separator} />
              <Menu.Item className={menu.Item} value="delete" onClick={() => setOpen(true)}>
                Delete...
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} role="alertdialog">
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
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
