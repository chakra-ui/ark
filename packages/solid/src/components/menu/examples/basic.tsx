import { Menu } from '@ark-ui/solid/menu'
import { ChevronDownIcon } from 'lucide-solid'
import styles from 'styles/menu.module.css'

export const Basic = () => (
  <Menu.Root>
    <Menu.Trigger class={styles.Trigger}>
      File
      <Menu.Indicator class={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        <Menu.Arrow class={styles.Arrow}>
          <Menu.ArrowTip class={styles.ArrowTip} />
        </Menu.Arrow>
        <Menu.Item class={styles.Item} value="new-file">
          New File
        </Menu.Item>
        <Menu.Item class={styles.Item} value="open">
          Open...
        </Menu.Item>
        <Menu.Item class={styles.Item} value="save">
          Save
        </Menu.Item>
        <Menu.Item class={styles.Item} value="save-as">
          Save As...
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
