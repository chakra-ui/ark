import { switchRecipe } from '@/panda/recipes'
import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from '@ark-ui/react'

export const DemoSwitch = () => (
  <Switch className={switchRecipe()}>
    <SwitchControl>
      <SwitchThumb />
    </SwitchControl>
    <SwitchLabel>Label</SwitchLabel>
  </Switch>
)
