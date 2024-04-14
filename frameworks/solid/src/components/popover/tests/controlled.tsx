import { createSignal } from 'solid-js'
import type { PopoverRootProps } from '../'
import { ComponentUnderTest } from './basic'

export const ControlledComponentUnderTest = (props: PopoverRootProps) => {
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
