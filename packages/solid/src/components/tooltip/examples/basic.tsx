import { Tooltip } from '@ark-ui/solid/tooltip'
import { Portal } from '@solidjs/web'
import styles from 'styles/tooltip.module.css'

export const Basic = () => (
  <Tooltip.Root>
    <Tooltip.Trigger class={styles.Trigger}>Hover Me</Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content class={styles.Content}>I am a tooltip!</Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
