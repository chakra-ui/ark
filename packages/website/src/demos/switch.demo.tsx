import { Switch, type SwitchProps } from '~/components/ui'

export const Demo = (props: SwitchProps) => (
  <Switch defaultChecked {...props}>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
  </Switch>
)
