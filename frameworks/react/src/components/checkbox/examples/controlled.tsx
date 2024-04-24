import { useState } from 'react'
import { Checkbox } from '../..'

export const Controlled = () => {
  const [checked, setChecked] = useState<Checkbox.CheckedState>(true)
  return (
    <Checkbox.Root checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
      <Checkbox.Control />
      <Checkbox.Label>Checkbox</Checkbox.Label>
    </Checkbox.Root>
  )
}
