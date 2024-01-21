import { useState } from 'react'
import { ComponentUnderTest } from './basic'

export const ControlledComponentUnderTest = () => {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <button onClick={() => setChecked(true)}>set checked</button>
      <ComponentUnderTest checked={checked} />
    </>
  )
}
