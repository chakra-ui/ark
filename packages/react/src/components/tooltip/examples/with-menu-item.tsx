import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { Tooltip } from '@ark-ui/react/tooltip'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/menu.module.css'
import tooltipStyles from 'styles/tooltip.module.css'

export const WithMenuItem = () => (
  <Menu.Root>
    <Menu.Trigger className={styles.Trigger}>
      File
      <Menu.Indicator className={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content className={styles.Content}>
        <Menu.Arrow className={styles.Arrow}>
          <Menu.ArrowTip className={styles.ArrowTip} />
        </Menu.Arrow>
        <Menu.Item className={styles.Item} value="new-file">
          New File
        </Menu.Item>
        <Menu.Item className={styles.Item} value="open">
          Open...
        </Menu.Item>
        <Tooltip.Root>
          <Tooltip.Trigger
            render={
              <Menu.Item className={styles.Item} value="save" disabled>
                Save
              </Menu.Item>
            }
          />
          <Portal>
            <Tooltip.Positioner>
              <Tooltip.Content className={tooltipStyles.Content}>No changes to save</Tooltip.Content>
            </Tooltip.Positioner>
          </Portal>
        </Tooltip.Root>
        <Menu.Item className={styles.Item} value="save-as">
          Save As...
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
