import type { CheckedChangeDetails as SwitchCheckedChangeDetails } from '@zag-js/switch'
import { useSwitchContext, type SwitchContext } from './switch-context'
import { SwitchControl, type SwitchControlProps } from './switch-control'
import { SwitchLabel, type SwitchLabelProps } from './switch-label'
import { SwitchRoot, type SwitchRootProps } from './switch-root'
import { SwitchThumb, type SwitchThumbProps } from './switch-thumb'

export const Switch = {
  Root: SwitchRoot,
  Control: SwitchControl,
  Label: SwitchLabel,
  Thumb: SwitchThumb,
}

export { SwitchControl, SwitchLabel, SwitchRoot, SwitchThumb, useSwitchContext }

export type {
  SwitchCheckedChangeDetails,
  SwitchContext,
  SwitchControlProps,
  SwitchLabelProps,
  SwitchRootProps,
  SwitchThumbProps,
}
