import { Menu } from '@ark-ui/solid/menu'
import { CheckIcon, ChevronDownIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import styles from 'styles/menu.module.css'

export const CheckboxItems = () => {
  const [showToolbar, setShowToolbar] = createSignal(true)
  const [showStatusBar, setShowStatusBar] = createSignal(false)

  return (
    <Menu.Root>
      <Menu.Trigger class={styles.Trigger}>
        View
        <Menu.Indicator class={styles.Indicator}>
          <ChevronDownIcon />
        </Menu.Indicator>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content class={styles.Content}>
          <Menu.CheckboxItem
            class={styles.CheckboxItem}
            checked={showToolbar()}
            onCheckedChange={setShowToolbar}
            value="toolbar"
          >
            <Menu.ItemIndicator class={styles.ItemIndicator}>
              <CheckIcon />
            </Menu.ItemIndicator>
            <Menu.ItemText class={styles.ItemText}>Show Toolbar</Menu.ItemText>
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            class={styles.CheckboxItem}
            checked={showStatusBar()}
            onCheckedChange={setShowStatusBar}
            value="status-bar"
          >
            <Menu.ItemIndicator class={styles.ItemIndicator}>
              <CheckIcon />
            </Menu.ItemIndicator>
            <Menu.ItemText class={styles.ItemText}>Show Status Bar</Menu.ItemText>
          </Menu.CheckboxItem>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
