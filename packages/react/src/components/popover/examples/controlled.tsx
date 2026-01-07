import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const Controlled = () => {
  const [open, setOpen] = useState(false)
  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger className={button.Root}>Click Me</Popover.Trigger>
      <Portal>
        <Popover.Positioner className={styles.Positioner}>
          <Popover.Content className={styles.Content}>
            <Popover.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Popover.CloseTrigger>
            <Popover.Title className={styles.Title}>Team Members</Popover.Title>
            <Popover.Description className={styles.Description}>
              Invite colleagues to collaborate on this project.
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
