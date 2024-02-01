import { Switch, type SwitchProps } from '~/components/ui/switch'

export const Demo = (props: SwitchProps) => {
  return (
    <Switch defaultChecked {...props}>
      Label
    </Switch>
  )
}
