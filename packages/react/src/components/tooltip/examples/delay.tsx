import { Tooltip } from '@ark-ui/react/tooltip'
import { Portal } from '@ark-ui/react/portal'
import styles from 'styles/tooltip.module.css'

export const Delay = () => (
  <Tooltip.Root closeDelay={0} openDelay={0}>
    <Tooltip.Trigger className={styles.Trigger}>Hover Me</Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content className={styles.Content}>I am a tooltip!</Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
