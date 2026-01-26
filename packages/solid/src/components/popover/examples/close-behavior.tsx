import { Popover } from '@ark-ui/solid/popover'
import { XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const CloseBehavior = () => (
  <Popover.Root closeOnEscape closeOnInteractOutside>
    <Popover.Trigger class={button.Root}>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner class={styles.Positioner}>
        <Popover.Content class={styles.Content}>
          <Popover.CloseTrigger class={styles.CloseTrigger}>
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title class={styles.Title}>Quick Actions</Popover.Title>
          <Popover.Description class={styles.Description}>
            Press Escape or click outside to close this popover.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
