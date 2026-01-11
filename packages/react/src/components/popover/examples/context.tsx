import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const Context = () => (
  <Popover.Root>
    <Popover.Trigger className={button.Root}>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content className={styles.Content}>
          <Popover.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title className={styles.Title}>Status</Popover.Title>
          <Popover.Description className={styles.Description}>
            <Popover.Context>
              {(context) => <span>Popover is {context.open ? 'visible' : 'hidden'}</span>}
            </Popover.Context>
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
