import { Menu } from '@ark-ui/react/menu'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/menu.module.css'

export const Controlled = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="stack">
      <button type="button" className={button.Root} onClick={() => setOpen(!open)}>
        Toggle
      </button>
      <Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Menu.Trigger className={styles.Trigger}>
          Actions
          <Menu.Indicator className={styles.Indicator}>
            <ChevronDownIcon />
          </Menu.Indicator>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content className={styles.Content}>
            <Menu.Item className={styles.Item} value="edit">
              Edit
            </Menu.Item>
            <Menu.Item className={styles.Item} value="duplicate">
              Duplicate
            </Menu.Item>
            <Menu.Item className={styles.Item} value="archive">
              Archive
            </Menu.Item>
            <Menu.Item className={styles.Item} value="delete">
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </div>
  )
}
