import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const Positioning = () => (
  <Popover.Root
    positioning={{
      placement: 'left-start',
      offset: { mainAxis: 12, crossAxis: 12 },
    }}
  >
    <Popover.Trigger className={button.Root}>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner className={styles.Positioner}>
        <Popover.Content className={styles.Content}>
          <Popover.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title className={styles.Title}>Left Placement</Popover.Title>
          <Popover.Description className={styles.Description}>
            This popover appears on the left with custom offset values.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
