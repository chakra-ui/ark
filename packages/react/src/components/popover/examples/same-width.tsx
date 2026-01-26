import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const SameWidth = () => {
  return (
    <Popover.Root positioning={{ sameWidth: true }}>
      <Popover.Trigger className={button.Root} style={{ minWidth: '200px' }}>
        Click Me
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner className={styles.Positioner}>
          <Popover.Content className={styles.Content}>
            <Popover.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Popover.CloseTrigger>
            <Popover.Title className={styles.Title}>Matched Width</Popover.Title>
            <Popover.Description className={styles.Description}>
              This popover matches the width of its trigger element.
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
