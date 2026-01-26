import { Tooltip } from '@ark-ui/react/tooltip'
import { Portal } from '@zag-js/react'
import styles from 'styles/tooltip.module.css'

export const Arrow = () => (
  <Tooltip.Root>
    <Tooltip.Trigger className={styles.Trigger}>Hover Me</Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content className={styles.Content}>
          <Tooltip.Arrow className={styles.Arrow}>
            <Tooltip.ArrowTip className={styles.ArrowTip} />
          </Tooltip.Arrow>
          I am a tooltip!
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
