import type { Checkbox } from '@ark-ui/react/checkbox'
import { useState } from 'react'
import { ComponentUnderTest } from './basic.tsx'

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
