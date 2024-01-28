import { useState } from 'react'
import { type PopoverRootProps } from '../'
import { ComponentUnderTest } from './basic'

export const ControlledComponentUnderTest = (props: PopoverRootProps) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen((prev) => !prev)}>toggle</button>
      <ComponentUnderTest {...props} open={open} />
    </>
  )
}
