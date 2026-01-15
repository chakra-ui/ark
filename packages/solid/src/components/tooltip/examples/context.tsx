import { Tooltip } from '@ark-ui/solid/tooltip'
import { Portal } from 'solid-js/web'
import styles from 'styles/tooltip.module.css'

export const Context = () => (
  <Tooltip.Root>
    <Tooltip.Trigger class={styles.Trigger}>Hover Me</Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Context>
          {(context) => (
            <Tooltip.Content class={styles.Content}>This tooltip is open: {context().open.toString()}</Tooltip.Content>
          )}
        </Tooltip.Context>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
