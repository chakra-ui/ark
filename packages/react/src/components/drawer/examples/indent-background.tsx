import { Drawer } from '@ark-ui/react/drawer'
import { XIcon } from 'lucide-react'
import styles from 'styles/drawer.module.css'

export const IndentBackground = () => (
  <Drawer.Stack>
    <Drawer.IndentBackground className={styles.IndentBackground} />
    <Drawer.Indent className={styles.Indent}>
      <Drawer.Root>
        <Drawer.Trigger className={styles.Trigger}>Open Drawer</Drawer.Trigger>
        <Drawer.Backdrop className={styles.Backdrop} />
        <Drawer.Positioner className={styles.Positioner}>
          <Drawer.Content className={styles.Content}>
            <Drawer.Grabber className={styles.Grabber}>
              <Drawer.GrabberIndicator className={styles.GrabberIndicator} />
            </Drawer.Grabber>
            <Drawer.Title className={styles.Title}>Stacked Drawer</Drawer.Title>
            <p>This drawer uses indent background and indent effects when swiped.</p>
            <Drawer.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Drawer.Indent>
  </Drawer.Stack>
)
