import { Popover } from '@ark-ui/solid/popover'
import { XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const Controlled = () => {
  const [open, setOpen] = createSignal(false)
  return (
    <Popover.Root open={open()} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger class={button.Root}>Click Me</Popover.Trigger>
      <Portal>
        <Popover.Positioner class={styles.Positioner}>
          <Popover.Content class={styles.Content}>
            <Popover.CloseTrigger class={styles.CloseTrigger}>
              <XIcon />
            </Popover.CloseTrigger>
            <Popover.Title class={styles.Title}>Team Members</Popover.Title>
            <Popover.Description class={styles.Description}>
              Invite colleagues to collaborate on this project.
            </Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
