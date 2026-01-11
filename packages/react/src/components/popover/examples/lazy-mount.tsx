import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const LazyMount = () => {
  return (
    <Popover.Root lazyMount>
      <Popover.Trigger className={button.Root}>Click Me</Popover.Trigger>
      <Portal>
        <Popover.Positioner className={styles.Positioner}>
          <Popover.Content className={styles.Content}>
            <Popover.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Popover.CloseTrigger>
            <Popover.Title className={styles.Title}>Lazy Loaded</Popover.Title>
            <Popover.Description className={styles.Description}>
              This content is only mounted when the popover opens.
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
