import { Popover } from '@ark-ui/react/popover'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'
import styles from 'styles/popover.module.css'

export const Anchor = () => {
  return (
    <Popover.Root>
      <div className="hstack">
        <Popover.Trigger className={button.Root}>Click Me</Popover.Trigger>
        <Popover.Anchor className={styles.Anchor}>
          <input className={field.Input} placeholder="Type here..." />
        </Popover.Anchor>
      </div>

      <Popover.Positioner className={styles.Positioner}>
        <Popover.Content className={styles.Content}>
          <Popover.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title className={styles.Title}>Title</Popover.Title>
          <Popover.Description className={styles.Description}>Description</Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
