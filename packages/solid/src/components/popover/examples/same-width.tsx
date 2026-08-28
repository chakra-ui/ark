import { Popover } from '@ark-ui/solid/popover'
import { XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const SameWidth = () => (
  <Popover.Root positioning={{ sameWidth: true }}>
    <Popover.Trigger class={button.Root} style={{ 'min-width': '200px' }}>
      Click Me
    </Popover.Trigger>
    <Portal>
      <Popover.Positioner class={styles.Positioner}>
        <Popover.Content class={styles.Content}>
          <Popover.CloseTrigger class={styles.CloseTrigger}>
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title class={styles.Title}>Matched Width</Popover.Title>
          <Popover.Description class={styles.Description}>
            This popover matches the width of its trigger element.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
