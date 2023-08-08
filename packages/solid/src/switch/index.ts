import { Switch as SwitchRoot, type SwitchProps } from './switch'
import { useSwitchContext } from './switch-context'
import { SwitchControl, type SwitchControlProps } from './switch-control'
import { SwitchInput, type SwitchInputProps } from './switch-input'
import { SwitchLabel, type SwitchLabelProps } from './switch-label'
import { SwitchThumb, type SwitchThumbProps } from './switch-thumb'
import { switchAnatomy } from './switch.anatomy'

const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  Control: SwitchControl,
  Input: SwitchInput,
  Label: SwitchLabel,
  Thumb: SwitchThumb,
})

export {
  Switch,
  SwitchControl,
  SwitchInput,
  SwitchLabel,
  SwitchThumb,
  switchAnatomy,
  useSwitchContext,
}

export type {
  SwitchControlProps,
  SwitchInputProps,
  SwitchLabelProps,
  SwitchProps,
  SwitchThumbProps,
}
