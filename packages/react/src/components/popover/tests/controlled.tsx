import { useState } from 'react'
import type { Popover } from '..'
import { ComponentUnderTest } from './basic'

export const ControlledComponentUnderTest = (props: Popover.RootProps) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen((prev) => !prev)}>
        toggle
      </button>
      <ComponentUnderTest {...props} open={open} />
    </>
  )
}
