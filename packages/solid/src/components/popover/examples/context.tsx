import { Popover } from '@ark-ui/solid/popover'
import { XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const Context = () => (
  <Popover.Root>
    <Popover.Trigger class={button.Root}>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content class={styles.Content}>
          <Popover.CloseTrigger class={styles.CloseTrigger}>
            <XIcon />
          </Popover.CloseTrigger>
          <Popover.Title class={styles.Title}>Status</Popover.Title>
          <Popover.Description class={styles.Description}>
            <Popover.Context>
              {(context) => <span>Popover is {context().open ? 'visible' : 'hidden'}</span>}
            </Popover.Context>
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
