import { Drawer } from '@ark-ui/react/drawer'
import { XIcon } from 'lucide-react'
import styles from 'styles/drawer.module.css'

export const Modal = () => (
  <Drawer.Root modal>
    <Drawer.Trigger className={styles.Trigger}>Open</Drawer.Trigger>
    <Drawer.Backdrop className={styles.Backdrop} />
    <Drawer.Positioner className={styles.Positioner}>
      <Drawer.Content className={styles.Content}>
        <Drawer.Grabber className={styles.Grabber}>
          <Drawer.GrabberIndicator className={styles.GrabberIndicator} />
        </Drawer.Grabber>
        <Drawer.Title className={styles.Title}>Modal Drawer</Drawer.Title>
        <Drawer.CloseTrigger className={styles.CloseTrigger}>
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
)
