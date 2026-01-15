import { Tooltip, useTooltip } from '@ark-ui/solid/tooltip'
import { Portal } from 'solid-js/web'
import styles from 'styles/tooltip.module.css'

export const RootProvider = () => {
  const tooltip = useTooltip()

  return (
    <>
      <button onClick={() => tooltip().setOpen(true)}>Open</button>

      <Tooltip.RootProvider value={tooltip}>
        <Tooltip.Trigger class={styles.Trigger}>Hover Me</Tooltip.Trigger>
        <Portal>
          <Tooltip.Positioner>
            <Tooltip.Content class={styles.Content}>I am a tooltip!</Tooltip.Content>
          </Tooltip.Positioner>
        </Portal>
      </Tooltip.RootProvider>
    </>
  )
}
