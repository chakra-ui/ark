import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useRef } from 'react'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'
import styles from 'styles/popover.module.css'

export const InitialFocusEl = () => {
  const ref = useRef<HTMLInputElement | null>(null)
  return (
    <Popover.Root initialFocusEl={() => ref.current}>
      <Popover.Trigger className={button.Root}>Update Profile</Popover.Trigger>
      <Portal>
        <Popover.Positioner className={styles.Positioner}>
          <Popover.Content className={styles.Content}>
            <Popover.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Popover.CloseTrigger>
            <Popover.Title className={styles.Title}>Enter your name</Popover.Title>
            <Popover.Description className={styles.Description}>Make changes to your profile here.</Popover.Description>
            <div className={styles.Body}>
              <input className={field.Input} placeholder="First Name" defaultValue="John" ref={ref} />
              <input className={field.Input} placeholder="Last Name" ref={ref} />
              <textarea className={field.Textarea} placeholder="Add details" />
              <button className={button.Root} data-variant="solid">
                Save
              </button>
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
