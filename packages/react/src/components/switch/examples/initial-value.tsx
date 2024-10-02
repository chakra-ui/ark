import { Switch } from '@ark-ui/react/switch'

export const InitialValue = () => (
  <Switch.Root defaultChecked>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
)
