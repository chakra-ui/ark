import { Popover } from '@ark-ui/solid/popover'
import { Tooltip } from '@ark-ui/solid/tooltip'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'
import tooltipStyles from 'styles/tooltip.module.css'

export const WithPopover = () => (
  <Popover.Root>
    <Tooltip.Root>
      <Tooltip.Trigger render={(props) => <Popover.Trigger {...props} class={button.Root} />}>Click Me</Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content class={tooltipStyles.Content}>See more details</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
    <Portal>
      <Popover.Positioner class={styles.Positioner}>
        <Popover.Content class={styles.Content}>
          <Popover.Title class={styles.Title}>Favorite Frameworks</Popover.Title>
          <Popover.Description class={styles.Description}>
            Manage and organize your favorite web frameworks.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
