import type { CheckedState } from '@zag-js/checkbox'
import { Checkbox as CheckboxRoot, type CheckboxProps } from './checkbox'
import { useCheckboxContext } from './checkbox-context'
import { CheckboxControl, type CheckboxControlProps } from './checkbox-control'
import { CheckboxLabel, type CheckboxLabelProps } from './checkbox-label'
import { checkboxAnatomy } from './checkbox.anatomy'

const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  Control: CheckboxControl,
  Label: CheckboxLabel,
})

export { Checkbox, CheckboxControl, CheckboxLabel, checkboxAnatomy, useCheckboxContext }
export type { CheckboxControlProps, CheckboxLabelProps, CheckboxProps, CheckedState }
