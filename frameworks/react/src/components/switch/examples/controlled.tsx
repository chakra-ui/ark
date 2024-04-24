import { useState } from 'react'
import { Switch } from '../..'

export const Controlled = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Switch.Root checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
    </Switch.Root>
  )
}
