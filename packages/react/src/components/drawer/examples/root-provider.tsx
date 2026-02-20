import { Drawer, useDrawer } from '@ark-ui/react/drawer'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/drawer.module.css'

export const RootProvider = () => {
  const drawer = useDrawer({
    defaultSnapPoint: 0.5,
    snapPoints: [0.25, 0.5, 1],
  })

  return (
    <div className="stack">
      <div className="hstack">
        <button className={button.Root} onClick={() => drawer.setOpen(true)}>
          Open via API
        </button>
        <button className={button.Root} onClick={() => drawer.setSnapPoint(0.25)}>
          Set to 25%
        </button>
        <button className={button.Root} onClick={() => drawer.setSnapPoint(1)}>
          Set to 100%
        </button>
      </div>

      <Drawer.RootProvider value={drawer}>
        <Drawer.Backdrop className={styles.Backdrop} />
        <Drawer.Positioner className={styles.Positioner}>
          <Drawer.Content className={styles.Content}>
            <Drawer.Grabber className={styles.Grabber}>
              <Drawer.GrabberIndicator className={styles.GrabberIndicator} />
            </Drawer.Grabber>
            <Drawer.Title className={styles.Title}>Drawer with RootProvider</Drawer.Title>
            <p>This drawer is controlled via the useDrawer hook and RootProvider.</p>
            <p>Active snap point: {drawer.snapPoint}</p>
            <Drawer.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.RootProvider>
    </div>
  )
}
