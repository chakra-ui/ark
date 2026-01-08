import { Menu } from '@ark-ui/solid/menu'
import { ChevronDownIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/menu.module.css'

export const Controlled = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <div class="stack">
      <button type="button" class={button.Root} onClick={() => setOpen(!open())}>
        Toggle
      </button>
      <Menu.Root open={open()} onOpenChange={(e) => setOpen(e.open)}>
        <Menu.Trigger class={styles.Trigger}>
          Actions
          <Menu.Indicator class={styles.Indicator}>
            <ChevronDownIcon />
          </Menu.Indicator>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content class={styles.Content}>
            <Menu.Item class={styles.Item} value="edit">
              Edit
            </Menu.Item>
            <Menu.Item class={styles.Item} value="duplicate">
              Duplicate
            </Menu.Item>
            <Menu.Item class={styles.Item} value="archive">
              Archive
            </Menu.Item>
            <Menu.Item class={styles.Item} value="delete">
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </div>
  )
}
