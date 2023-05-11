import { switchRecipe } from '@/panda/recipes'
import { Switch, SwitchControl, SwitchInput, SwitchLabel, SwitchThumb } from '@ark-ui/react'

export const DemoSwitch = () => (
  <Switch className={switchRecipe()}>
    <SwitchControl>
      <SwitchInput />
      <SwitchThumb />
    </SwitchControl>
    <SwitchLabel>Label</SwitchLabel>
  </Switch>
)
