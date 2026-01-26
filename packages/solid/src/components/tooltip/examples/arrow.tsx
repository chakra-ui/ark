import { Tooltip } from '@ark-ui/solid/tooltip'
import { Portal } from 'solid-js/web'
import styles from 'styles/tooltip.module.css'

export const Arrow = () => (
  <Tooltip.Root>
    <Tooltip.Trigger class={styles.Trigger}>Hover Me</Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content class={styles.Content}>
          <Tooltip.Arrow class={styles.Arrow}>
            <Tooltip.ArrowTip class={styles.ArrowTip} />
          </Tooltip.Arrow>
          I am a tooltip!
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
