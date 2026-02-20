import { Drawer } from '@ark-ui/solid/drawer'
import { XIcon } from 'lucide-solid'
import styles from 'styles/drawer.module.css'

export const SwipeDirection = () => (
  <Drawer.Root swipeDirection="right">
    <Drawer.Trigger class={styles.Trigger}>Open Right</Drawer.Trigger>
    <Drawer.Backdrop class={styles.Backdrop} />
    <Drawer.Positioner class={styles.Positioner}>
      <Drawer.Content class={styles.Content}>
        <Drawer.Title class={styles.Title}>Right Drawer</Drawer.Title>
        <p>This drawer slides in from the right side.</p>
        <Drawer.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
)
