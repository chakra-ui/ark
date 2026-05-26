import { Drawer } from '@ark-ui/react/drawer'
import { XIcon } from 'lucide-react'
import styles from 'styles/drawer-indent.module.css'

export const IndentBackground = () => (
  <Drawer.Stack>
    <div className={styles.Sandbox}>
      <Drawer.IndentBackground className={styles.IndentBackground} />
      <Drawer.Root modal={false}>
        <Drawer.Indent className={styles.Indent}>
          <div className={styles.IndentCenter}>
            <Drawer.Trigger className={styles.Trigger}>Open Drawer</Drawer.Trigger>
          </div>
        </Drawer.Indent>
        <Drawer.Backdrop className={styles.Backdrop} />
        <Drawer.Positioner className={styles.Positioner}>
          <Drawer.Content className={styles.Content}>
            <Drawer.Grabber className={styles.Grabber}>
              <Drawer.GrabberIndicator className={styles.GrabberIndicator} />
            </Drawer.Grabber>
            <Drawer.Title className={styles.Title}>Notifications</Drawer.Title>
            <Drawer.Description className={styles.Description}>You are all caught up. Good job!</Drawer.Description>
            <Drawer.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </div>
  </Drawer.Stack>
)
