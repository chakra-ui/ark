import { Menu } from '@ark-ui/react/menu'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/menu.module.css'

export const CheckboxItems = () => {
  const [showToolbar, setShowToolbar] = useState(true)
  const [showStatusBar, setShowStatusBar] = useState(false)

  return (
    <Menu.Root>
      <Menu.Trigger className={styles.Trigger}>
        View
        <Menu.Indicator className={styles.Indicator}>
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className={styles.Content}>
          <Menu.CheckboxItem
            className={styles.CheckboxItem}
            checked={showToolbar}
            onCheckedChange={setShowToolbar}
            value="toolbar"
          >
            <Menu.ItemIndicator className={styles.ItemIndicator}>
              <CheckIcon />
            </Menu.ItemIndicator>
            <Menu.ItemText className={styles.ItemText}>Show Toolbar</Menu.ItemText>
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            className={styles.CheckboxItem}
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
            value="status-bar"
          >
            <Menu.ItemIndicator className={styles.ItemIndicator}>
              <CheckIcon />
            </Menu.ItemIndicator>
            <Menu.ItemText className={styles.ItemText}>Show Status Bar</Menu.ItemText>
          </Menu.CheckboxItem>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
