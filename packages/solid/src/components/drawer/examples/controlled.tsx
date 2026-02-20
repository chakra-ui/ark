import { Drawer, type DrawerOpenChangeDetails } from '@ark-ui/solid/drawer'
import { XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/drawer.module.css'

export const Controlled = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <>
      <button class={button.Root} onClick={() => setOpen(!open())}>
        {open() ? 'Close' : 'Open'} Drawer
      </button>

      <Drawer.Root open={open()} onOpenChange={(details: DrawerOpenChangeDetails) => setOpen(details.open)}>
        <Drawer.Backdrop class={styles.Backdrop} />
        <Drawer.Positioner class={styles.Positioner}>
          <Drawer.Content class={styles.Content}>
            <Drawer.Grabber class={styles.Grabber}>
              <Drawer.GrabberIndicator class={styles.GrabberIndicator} />
            </Drawer.Grabber>
            <Drawer.Title class={styles.Title}>Controlled Drawer</Drawer.Title>
            <p>This drawer is controlled via state.</p>
            <Drawer.CloseTrigger class={styles.CloseTrigger}>
              <XIcon />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  )
}
