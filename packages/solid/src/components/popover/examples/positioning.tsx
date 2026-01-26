import { Popover } from '@ark-ui/solid/popover'
import { XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const Positioning = () => (
  <Popover.Root
    positioning={{
      placement: 'left-start',
      offset: { mainAxis: 12, crossAxis: 12 },
    }}
  >
    <Popover.Trigger class={button.Root}>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner class={styles.Positioner}>
        <Popover.Content class={styles.Content}>
          <Popover.CloseTrigger class={styles.CloseTrigger}>
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title class={styles.Title}>Left Placement</Popover.Title>
          <Popover.Description class={styles.Description}>
            This popover appears on the left with custom offset values.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
