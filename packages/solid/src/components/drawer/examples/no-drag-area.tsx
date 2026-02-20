import { Drawer } from '@ark-ui/solid/drawer'
import { XIcon } from 'lucide-solid'
import styles from 'styles/drawer.module.css'

export const NoDragArea = () => (
  <Drawer.Root>
    <Drawer.Trigger class={styles.Trigger}>Open</Drawer.Trigger>
    <Drawer.Backdrop class={styles.Backdrop} />
    <Drawer.Positioner class={styles.Positioner}>
      <Drawer.Content class={styles.Content}>
        <Drawer.Grabber class={styles.Grabber}>
          <Drawer.GrabberIndicator class={styles.GrabberIndicator} />
        </Drawer.Grabber>
        <Drawer.Title class={styles.Title}>Drawer Title</Drawer.Title>
        <p data-no-drag>This is the no drag area of the drawer.</p>
        <Drawer.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
)
