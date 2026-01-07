import { Popover, usePopover } from '@ark-ui/solid/popover'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const RootProvider = () => {
  const popover = usePopover()

  return (
    <div class="stack">
      <button class={button.Root} onClick={() => popover().setOpen(true)}>
        Popover is {popover().open ? 'open' : 'closed'}
      </button>
      <Popover.RootProvider value={popover}>
        <Portal>
          <Popover.Positioner class={styles.Positioner}>
            <Popover.Content class={styles.Content}>
              <Popover.Title class={styles.Title}>Controlled Externally</Popover.Title>
              <Popover.Description class={styles.Description}>
                This popover is controlled via the usePopover hook.
              </Popover.Description>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.RootProvider>
    </div>
  )
}
