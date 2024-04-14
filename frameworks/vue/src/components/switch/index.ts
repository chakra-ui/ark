import type { CheckedChangeDetails as SwitchCheckedChangeDetails } from '@zag-js/switch'
import { type SwitchContext, useSwitchContext } from './switch-context'
import { SwitchControl, type SwitchControlProps } from './switch-control'
import { SwitchLabel, type SwitchLabelProps } from './switch-label'
import { SwitchRoot, type SwitchRootProps } from './switch-root'
import { SwitchThumb, type SwitchThumbProps } from './switch-thumb'

export * as Switch from './switch'

export { SwitchControl, SwitchLabel, SwitchRoot, SwitchThumb, useSwitchContext }

export type {
  SwitchCheckedChangeDetails,
  SwitchContext,
  SwitchControlProps,
  SwitchLabelProps,
  SwitchRootProps,
  SwitchThumbProps,
}
