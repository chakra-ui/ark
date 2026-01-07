import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const Basic = () => (
  <Popover.Root>
    <Popover.Trigger className={button.Root}>Click Me</Popover.Trigger>
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
