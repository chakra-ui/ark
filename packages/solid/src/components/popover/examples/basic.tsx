import { Popover } from '@ark-ui/solid/popover'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const Basic = () => (
  <Popover.Root>
    <Popover.Trigger class={button.Root}>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner class={styles.Positioner}>
        <Popover.Content class={styles.Content}>
          <Popover.Title class={styles.Title}>Favorite Frameworks</Popover.Title>
          <Popover.Description class={styles.Description}>
            Manage and organize your favorite web frameworks.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
