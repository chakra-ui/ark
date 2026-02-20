import { Drawer } from '@ark-ui/solid/drawer'
import { XIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/drawer.module.css'

export const Scrollable = () => (
  <Drawer.Root>
    <Drawer.Trigger class={styles.Trigger}>Open</Drawer.Trigger>
    <Drawer.Backdrop class={styles.Backdrop} />
    <Drawer.Positioner class={styles.Positioner}>
      <Drawer.Content class={styles.Content}>
        <Drawer.Grabber class={styles.Grabber}>
          <Drawer.GrabberIndicator class={styles.GrabberIndicator} />
        </Drawer.Grabber>
        <Drawer.Title class={styles.Title}>Scrollable Drawer</Drawer.Title>
        <Drawer.CloseTrigger class={styles.CloseTrigger}>
          <XIcon />
        </Drawer.CloseTrigger>
        <div class={styles.Scrollable}>
          <For each={Array.from({ length: 50 })}>
            {(_, index) => <div class={styles.ScrollableItem}>Item {index() + 1}</div>}
          </For>
        </div>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
)
