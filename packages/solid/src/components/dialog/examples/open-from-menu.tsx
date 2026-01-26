import { Dialog } from '@ark-ui/solid/dialog'
import { Menu } from '@ark-ui/solid/menu'
import { ChevronDownIcon, XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import dialog from 'styles/dialog.module.css'
import menu from 'styles/menu.module.css'

export const OpenFromMenu = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <>
      <Menu.Root>
        <Menu.Trigger class={menu.Trigger}>
          Actions
          <Menu.Indicator class={menu.Indicator}>
            <ChevronDownIcon />
          </Menu.Indicator>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content class={menu.Content}>
              <Menu.Item class={menu.Item} value="edit">
                Edit
              </Menu.Item>
              <Menu.Item class={menu.Item} value="duplicate">
                Duplicate
              </Menu.Item>
              <Menu.Separator class={menu.Separator} />
              <Menu.Item class={menu.Item} value="delete" onClick={() => setOpen(true)}>
                Delete...
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <Dialog.Root open={open()} onOpenChange={(e) => setOpen(e.open)} role="alertdialog">
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
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
