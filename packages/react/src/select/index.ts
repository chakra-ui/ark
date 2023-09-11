import { Select as SelectRoot, type SelectProps } from './select'
import { SelectContent, type SelectContentProps } from './select-content'
import { useSelectContext, type SelectContext } from './select-context'
import { SelectLabel, type SelectLabelProps } from './select-label'
import { SelectOption, type SelectOptionProps } from './select-option'
import { SelectOptionGroup, type SelectOptionGroupProps } from './select-option-group'
import {
  SelectOptionGroupLabel,
  type SelectOptionGroupLabelProps,
} from './select-option-group-label'
import { SelectPositioner, type SelectPositionerProps } from './select-positioner'
import { SelectTrigger, type SelectTriggerProps } from './select-trigger'
import { selectAnatomy } from './select.anatomy'

const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Content: SelectContent,
  Label: SelectLabel,
  Option: SelectOption,
  OptionGroup: SelectOptionGroup,
  OptionGroupLabel: SelectOptionGroupLabel,
  Positioner: SelectPositioner,
  Trigger: SelectTrigger,
})

export {
  Select,
  SelectContent,
  SelectLabel,
  SelectOption,
  SelectOptionGroup,
  SelectOptionGroupLabel,
  SelectPositioner,
  SelectTrigger,
  selectAnatomy,
  useSelectContext,
}

export type {
  SelectContentProps,
  SelectContext,
  SelectLabelProps,
  SelectOptionGroupLabelProps,
  SelectOptionGroupProps,
  SelectOptionProps,
  SelectPositionerProps,
  SelectProps,
  SelectTriggerProps,
}
