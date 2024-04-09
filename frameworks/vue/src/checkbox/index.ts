import type {
  CheckedChangeDetails as CheckboxCheckedChangeDetails,
  CheckedState as CheckboxState,
} from '@zag-js/checkbox'
import { useCheckboxContext, type CheckboxContext } from './checkbox-context'
import { CheckboxControl, type CheckboxControlProps } from './checkbox-control'
import { CheckboxIndicator, type CheckboxIndicatorProps } from './checkbox-indicator'
import { CheckboxLabel, type CheckboxLabelProps } from './checkbox-label'
import { CheckboxRoot, type CheckboxRootProps } from './checkbox-root'

export * as Checkbox from './checkbox'

export { CheckboxControl, CheckboxIndicator, CheckboxLabel, CheckboxRoot, useCheckboxContext }

export type {
  CheckboxCheckedChangeDetails,
  CheckboxContext,
  CheckboxControlProps,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  CheckboxRootProps,
  CheckboxState,
}
