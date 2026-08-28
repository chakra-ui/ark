import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import button from 'styles/button.module.css'
import styles from 'styles/popover.module.css'

export const Nested = () => {
  return (
    <Popover.Root>
      <Popover.Trigger className={button.Root}>Click Me</Popover.Trigger>
      <Portal>
        <Popover.Positioner className={styles.Positioner}>
          <Popover.Content className={styles.Content}>
            <Popover.Title className={styles.Title}>Settings</Popover.Title>
            <Popover.Description className={styles.Description}>
              Manage your preferences and account settings.
            </Popover.Description>
            <Popover.Root lazyMount unmountOnExit positioning={{ placement: 'right' }}>
              <Popover.Trigger className={button.Root}>Advanced</Popover.Trigger>
              <Portal>
                <Popover.Positioner className={styles.Positioner}>
                  <Popover.Content className={styles.Content}>
                    <Popover.Title className={styles.Title}>Advanced Settings</Popover.Title>
                    <Popover.Description className={styles.Description}>
                      Configure advanced options for power users.
                    </Popover.Description>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
