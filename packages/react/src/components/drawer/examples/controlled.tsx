import { Drawer, type DrawerOpenChangeDetails } from '@ark-ui/react/drawer'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/drawer.module.css'

export const Controlled = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className={button.Root} onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'} Drawer
      </button>

      <Drawer.Root open={open} onOpenChange={(details: DrawerOpenChangeDetails) => setOpen(details.open)}>
        <Drawer.Backdrop className={styles.Backdrop} />
        <Drawer.Positioner className={styles.Positioner}>
          <Drawer.Content className={styles.Content}>
            <Drawer.Grabber className={styles.Grabber}>
              <Drawer.GrabberIndicator className={styles.GrabberIndicator} />
            </Drawer.Grabber>
            <Drawer.Title className={styles.Title}>Controlled Drawer</Drawer.Title>
            <p>This drawer is controlled via state.</p>
            <Drawer.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  )
}
