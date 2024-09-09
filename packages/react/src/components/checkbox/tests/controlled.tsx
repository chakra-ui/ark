import { useState } from 'react'
import type { Checkbox } from '..'
import { ComponentUnderTest } from './basic'

export const ControlledComponentUnderTest = (props: Checkbox.RootProps) => {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setChecked(true)}>
        set checked
      </button>
      <ComponentUnderTest {...props} checked={checked} />
    </>
  )
}
