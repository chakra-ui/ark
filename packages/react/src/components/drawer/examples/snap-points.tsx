import { Drawer } from '@ark-ui/react/drawer'
import { XIcon } from 'lucide-react'
import styles from 'styles/drawer.module.css'

export const SnapPoints = () => (
  <Drawer.Root snapPoints={[0.25, 0.5, 1]} defaultSnapPoint={0.5}>
    <Drawer.Trigger className={styles.Trigger}>Open</Drawer.Trigger>
    <Drawer.Backdrop className={styles.Backdrop} />
    <Drawer.Positioner className={styles.Positioner}>
      <Drawer.Content className={styles.Content}>
        <Drawer.Grabber className={styles.Grabber}>
          <Drawer.GrabberIndicator className={styles.GrabberIndicator} />
        </Drawer.Grabber>
        <Drawer.Title className={styles.Title}>Drawer with Snap Points</Drawer.Title>
        <p>This drawer has multiple snap points at 25%, 50%, and 100% of the viewport height.</p>
        <p>Drag the grabber to snap between different heights, or swipe to dismiss.</p>
        <Drawer.CloseTrigger className={styles.CloseTrigger}>
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
)
