import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const CloseBehavior = () => (
  <Popover.Root closeOnEscape closeOnInteractOutside>
    <Popover.Trigger className={button.Root}>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner className={styles.Positioner}>
        <Popover.Content className={styles.Content}>
          <Popover.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title className={styles.Title}>Quick Actions</Popover.Title>
          <Popover.Description className={styles.Description}>
            Press Escape or click outside to close this popover.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
