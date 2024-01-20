import type {
  CheckedChangeDetails as CheckboxCheckedChangeDetails,
  CheckedState,
} from '@zag-js/checkbox'
import { Checkbox as CheckboxRoot, type CheckboxProps } from './checkbox'
import { useCheckboxContext, type CheckboxContext } from './checkbox-context'
import { CheckboxControl, type CheckboxControlProps } from './checkbox-control'
import { CheckboxIndicator, type CheckboxIndicatorProps } from './checkbox-indicator'
import { CheckboxLabel, type CheckboxLabelProps } from './checkbox-label'

const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  Control: CheckboxControl,
  Label: CheckboxLabel,
  Indicator: CheckboxIndicator,
})

export { Checkbox, CheckboxControl, CheckboxIndicator, CheckboxLabel, useCheckboxContext }
export type {
  CheckboxCheckedChangeDetails,
  CheckboxContext,
  CheckboxControlProps,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  CheckboxProps,
  CheckedState,
}
