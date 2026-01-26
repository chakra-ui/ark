import { Tooltip } from '@ark-ui/solid/tooltip'
import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/tooltip.module.css'

export const Controlled = () => {
  const [open, setOpen] = createSignal(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(!open())}>
        Toggle
      </button>
      <Tooltip.Root open={open()} onOpenChange={(e) => setOpen(e.open)}>
        <Tooltip.Trigger class={styles.Trigger}>Hover Me</Tooltip.Trigger>
        <Portal>
          <Tooltip.Positioner>
            <Tooltip.Content class={styles.Content}>I am a tooltip!</Tooltip.Content>
          </Tooltip.Positioner>
        </Portal>
      </Tooltip.Root>
    </>
  )
}
