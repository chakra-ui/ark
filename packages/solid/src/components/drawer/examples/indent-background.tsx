import { Drawer } from '@ark-ui/solid/drawer'
import { XIcon } from 'lucide-solid'
import styles from 'styles/drawer.module.css'

export const IndentBackground = () => (
  <Drawer.Stack>
    <Drawer.IndentBackground class={styles.IndentBackground} />
    <Drawer.Indent class={styles.Indent}>
      <Drawer.Root>
        <Drawer.Trigger class={styles.Trigger}>Open Drawer</Drawer.Trigger>
        <Drawer.Backdrop class={styles.Backdrop} />
        <Drawer.Positioner class={styles.Positioner}>
          <Drawer.Content class={styles.Content}>
            <Drawer.Grabber class={styles.Grabber}>
              <Drawer.GrabberIndicator class={styles.GrabberIndicator} />
            </Drawer.Grabber>
            <Drawer.Title class={styles.Title}>Stacked Drawer</Drawer.Title>
            <p>This drawer uses indent background and indent effects when swiped.</p>
            <Drawer.CloseTrigger class={styles.CloseTrigger}>
              <XIcon />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Drawer.Indent>
  </Drawer.Stack>
)
