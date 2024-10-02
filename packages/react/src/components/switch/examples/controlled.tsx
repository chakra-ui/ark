import { Switch } from '@ark-ui/react/switch'
import { useState } from 'react'

export const Controlled = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Switch.Root checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  )
}
