import { Tooltip } from '@ark-ui/solid/tooltip'
import { Portal } from 'solid-js/web'
import styles from 'styles/tooltip.module.css'

export const Delay = () => (
  <Tooltip.Root closeDelay={0} openDelay={0}>
    <Tooltip.Trigger class={styles.Trigger}>Hover Me</Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content class={styles.Content}>I am a tooltip!</Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
