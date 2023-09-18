import { Switch as SwitchRoot, type SwitchProps } from './switch'
import { useSwitchContext, type SwitchContext } from './switch-context'
import { SwitchControl, type SwitchControlProps } from './switch-control'
import { SwitchLabel, type SwitchLabelProps } from './switch-label'
import { SwitchThumb, type SwitchThumbProps } from './switch-thumb'
import { switchAnatomy } from './switch.anatomy'

const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  Control: SwitchControl,
  Label: SwitchLabel,
  Thumb: SwitchThumb,
})

export { Switch, SwitchControl, SwitchLabel, SwitchThumb, switchAnatomy, useSwitchContext }

export type { SwitchContext, SwitchControlProps, SwitchLabelProps, SwitchProps, SwitchThumbProps }
