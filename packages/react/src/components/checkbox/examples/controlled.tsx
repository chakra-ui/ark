import { CheckIcon } from 'lucide-react'
import { useState } from 'react'
import { Checkbox } from '../..'

export const Controlled = () => {
  const [checked, setChecked] = useState<Checkbox.CheckedState>(true)

  return (
    <Checkbox.Root checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
      <Checkbox.Label>Checkbox</Checkbox.Label>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  )
}
