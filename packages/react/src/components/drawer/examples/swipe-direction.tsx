import { Drawer } from '@ark-ui/react/drawer'
import { XIcon } from 'lucide-react'
import styles from 'styles/drawer.module.css'

export const SwipeDirection = () => (
  <Drawer.Root swipeDirection="right">
    <Drawer.Trigger className={styles.Trigger}>Open Right</Drawer.Trigger>
    <Drawer.Backdrop className={styles.Backdrop} />
    <Drawer.Positioner className={styles.Positioner}>
      <Drawer.Content className={styles.Content}>
        <Drawer.Title className={styles.Title}>Right Drawer</Drawer.Title>
        <p>This drawer slides in from the right side.</p>
        <Drawer.CloseTrigger className={styles.CloseTrigger}>
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
)
