import type { Popover } from '@ark-ui/solid/popover'
import { createSignal } from 'solid-js'
import { ComponentUnderTest } from './basic.tsx'

export const ControlledComponentUnderTest = (props: Popover.RootProps) => {
  const [open, setOpen] = createSignal(false)
  return (
    <>
      <button type="button" onClick={() => setOpen((prev) => !prev)}>
        toggle
      </button>
      <ComponentUnderTest {...props} open={open()} />
    </>
  )
}
