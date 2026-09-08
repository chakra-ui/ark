import { Menu } from '@ark-ui/solid/menu'
import { Tooltip } from '@ark-ui/solid/tooltip'
import { ChevronDownIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import styles from 'styles/menu.module.css'
import tooltipStyles from 'styles/tooltip.module.css'

export const WithMenuTrigger = () => (
  <Menu.Root>
    <Tooltip.Root>
      <Tooltip.Trigger
        render={(props) => (
          <Menu.Trigger {...props} class={styles.Trigger}>
            File
            <Menu.Indicator class={styles.Indicator}>
              <ChevronDownIcon />
            </Menu.Indicator>
          </Menu.Trigger>
        )}
      />
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content class={tooltipStyles.Content}>Open the file menu</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
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
