import { useState } from 'react'
import type { CheckboxRootProps } from '../'
import { ComponentUnderTest } from './basic'

export const ControlledComponentUnderTest = (props: CheckboxRootProps) => {
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
