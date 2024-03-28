import type { CheckedChangeDetails as SwitchCheckedChangeDetails } from '@zag-js/switch'
import { SwitchContext, type SwitchContextProps } from './switch-context'
import { SwitchControl, type SwitchControlProps } from './switch-control'
import { SwitchLabel, type SwitchLabelProps } from './switch-label'
import { SwitchRoot, type SwitchRootProps } from './switch-root'
import { SwitchThumb, type SwitchThumbProps } from './switch-thumb'
import { useSwitchContext, type UseSwitchContext } from './use-switch-context'

export * as Switch from './switch'

export { SwitchContext, SwitchControl, SwitchLabel, SwitchRoot, SwitchThumb, useSwitchContext }

export type {
  SwitchCheckedChangeDetails,
  SwitchContextProps,
  SwitchControlProps,
  SwitchLabelProps,
  SwitchRootProps,
  SwitchThumbProps,
  UseSwitchContext,
}
