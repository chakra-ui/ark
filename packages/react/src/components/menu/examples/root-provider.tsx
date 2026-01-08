import { Menu, useMenu } from '@ark-ui/react/menu'
import { ChevronDownIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/menu.module.css'

export const RootProvider = () => {
  const menu = useMenu()

  return (
    <div className="stack">
      <button className={button.Root} onClick={() => menu.api.setHighlightedValue('copy')}>
        Highlight Copy
      </button>
      <Menu.RootProvider value={menu}>
        <Menu.Trigger className={styles.Trigger}>
          Edit
          <Menu.Indicator className={styles.Indicator}>
            <ChevronDownIcon />
          </Menu.Indicator>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content className={styles.Content}>
            <Menu.Item className={styles.Item} value="cut">
              Cut
            </Menu.Item>
            <Menu.Item className={styles.Item} value="copy">
              Copy
            </Menu.Item>
            <Menu.Item className={styles.Item} value="paste">
              Paste
            </Menu.Item>
            <Menu.Item className={styles.Item} value="delete">
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.RootProvider>
    </div>
  )
}
