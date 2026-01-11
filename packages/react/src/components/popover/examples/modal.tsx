import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const Modal = () => (
  <Popover.Root modal>
    <Popover.Trigger className={button.Root}>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner className={styles.Positioner}>
        <Popover.Content className={styles.Content}>
          <Popover.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title className={styles.Title}>Confirm Action</Popover.Title>
          <Popover.Description className={styles.Description}>
            Focus is trapped inside this modal popover until dismissed.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
