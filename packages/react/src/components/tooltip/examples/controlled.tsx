import { Portal } from '@ark-ui/react/portal'
import { Tooltip } from '@ark-ui/react/tooltip'
import { useState } from 'react'
import styles from 'styles/tooltip.module.css'
import button from 'styles/button.module.css'

export const Controlled = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="stack">
      <button type="button" onClick={() => setOpen(!open)} className={button.Root}>
        Toggle
      </button>
      <Tooltip.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Tooltip.Trigger className={styles.Trigger}>Hover Me</Tooltip.Trigger>
        <Portal>
          <Tooltip.Positioner>
            <Tooltip.Content className={styles.Content}>I am a tooltip!</Tooltip.Content>
          </Tooltip.Positioner>
        </Portal>
      </Tooltip.Root>
    </div>
  )
}
