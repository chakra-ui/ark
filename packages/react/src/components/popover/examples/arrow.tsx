import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const Arrow = () => (
  <Popover.Root>
    <Popover.Trigger className={button.Root}>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner className={styles.Positioner}>
        <Popover.Content className={styles.Content}>
          <Popover.Arrow className={styles.Arrow}>
            <Popover.ArrowTip className={styles.ArrowTip} />
          </Popover.Arrow>
          <Popover.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title className={styles.Title}>Notifications</Popover.Title>
          <Popover.Description className={styles.Description}>
            You have 3 unread messages in your inbox.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
