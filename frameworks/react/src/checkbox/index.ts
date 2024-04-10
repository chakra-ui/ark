import type {
  CheckedChangeDetails as CheckboxCheckedChangeDetails,
  CheckedState as CheckboxState,
} from '@zag-js/checkbox'
import { CheckboxContext, type CheckboxContextProps } from './checkbox-context'
import { CheckboxControl, type CheckboxControlProps } from './checkbox-control'
import { CheckboxIndicator, type CheckboxIndicatorProps } from './checkbox-indicator'
import { CheckboxLabel, type CheckboxLabelProps } from './checkbox-label'
import { CheckboxRoot, type CheckboxRootProps } from './checkbox-root'
import { useCheckboxContext, type UseCheckboxContext } from './use-checkbox-context'

export * as Checkbox from './checkbox'
export {
  CheckboxContext,
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
  useCheckboxContext,
}

export type {
  CheckboxCheckedChangeDetails,
  CheckboxContextProps,
  CheckboxControlProps,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  CheckboxRootProps,
  CheckboxState,
  UseCheckboxContext,
}
