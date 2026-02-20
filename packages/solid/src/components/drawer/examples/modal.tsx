import { Drawer } from '@ark-ui/solid/drawer'
import { XIcon } from 'lucide-solid'
import styles from 'styles/drawer.module.css'

export const Modal = () => (
  <Drawer.Root modal>
    <Drawer.Trigger class={styles.Trigger}>Open</Drawer.Trigger>
    <Drawer.Backdrop class={styles.Backdrop} />
    <Drawer.Positioner class={styles.Positioner}>
      <Drawer.Content class={styles.Content}>
        <Drawer.Grabber class={styles.Grabber}>
          <Drawer.GrabberIndicator class={styles.GrabberIndicator} />
        </Drawer.Grabber>
        <Drawer.Title class={styles.Title}>Modal Drawer</Drawer.Title>
        <Drawer.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
)
