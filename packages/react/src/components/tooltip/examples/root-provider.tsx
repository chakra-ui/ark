import { Tooltip, useTooltip } from '@ark-ui/react/tooltip'
import { Portal } from '@ark-ui/react/portal'
import styles from 'styles/tooltip.module.css'

export const RootProvider = () => {
  const tooltip = useTooltip()

  return (
    <>
      <output>Open: {String(tooltip.open)}</output>
      <Tooltip.RootProvider value={tooltip}>
        <Tooltip.Trigger className={styles.Trigger}>Hover Me</Tooltip.Trigger>
        <Portal>
          <Tooltip.Positioner>
            <Tooltip.Content className={styles.Content}>I am a tooltip!</Tooltip.Content>
          </Tooltip.Positioner>
        </Portal>
      </Tooltip.RootProvider>
    </>
  )
}
