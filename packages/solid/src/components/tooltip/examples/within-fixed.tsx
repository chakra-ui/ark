import { Tooltip } from '@ark-ui/solid/tooltip'
import { Portal } from 'solid-js/web'
import styles from 'styles/tooltip.module.css'

export const WithinFixed = () => (
  <div style={{ position: 'fixed', top: '40px', left: '40px', padding: '40px', background: 'red' }}>
    <Tooltip.Root positioning={{ strategy: 'fixed' }}>
      <Tooltip.Trigger class={styles.Trigger}>Hover Me</Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content class={styles.Content}>I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  </div>
)
