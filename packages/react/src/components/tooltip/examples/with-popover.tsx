import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { Tooltip } from '@ark-ui/react/tooltip'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'
import tooltipStyles from 'styles/tooltip.module.css'

export const WithPopover = () => (
  <Popover.Root>
    <Tooltip.Root>
      <Tooltip.Trigger render={<Popover.Trigger className={button.Root}>Click Me</Popover.Trigger>} />
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content className={tooltipStyles.Content}>See more details</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
    <Portal>
      <Popover.Positioner className={styles.Positioner}>
        <Popover.Content className={styles.Content}>
          <Popover.Title className={styles.Title}>Favorite Frameworks</Popover.Title>
          <Popover.Description className={styles.Description}>
            Manage and organize your favorite web frameworks.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
