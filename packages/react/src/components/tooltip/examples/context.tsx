import { Portal } from '@ark-ui/react/portal'
import { Tooltip } from '@ark-ui/react/tooltip'
import styles from 'styles/tooltip.module.css'

export const Context = () => (
  <Tooltip.Root>
    <Tooltip.Trigger className={styles.Trigger}>Hover Me</Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Context>
          {(tooltip) => (
            <Tooltip.Content className={styles.Content}>
              This tooltip is open: {tooltip.open.toString()}
            </Tooltip.Content>
          )}
        </Tooltip.Context>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
