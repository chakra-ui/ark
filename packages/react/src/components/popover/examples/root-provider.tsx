import { Popover, usePopover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const RootProvider = () => {
  const popover = usePopover({
    positioning: {
      placement: 'bottom-start',
    },
  })

  return (
    <div className="stack">
      <div>Popover is {popover.open ? 'open' : 'closed'}</div>
      <Popover.RootProvider value={popover}>
        <Popover.Trigger className={button.Root}>Toggle Popover</Popover.Trigger>
        <Portal>
          <Popover.Positioner className={styles.Positioner}>
            <Popover.Content className={styles.Content}>
              <Popover.Title className={styles.Title}>Controlled Externally</Popover.Title>
              <Popover.Description className={styles.Description}>
                This popover is controlled via the usePopover hook.
              </Popover.Description>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.RootProvider>
    </div>
  )
}
