import { Combobox as ComboboxRoot, type ComboboxProps } from './combobox'
import { ComboboxClearTrigger, type ComboboxClearTriggerProps } from './combobox-clear-trigger'
import { ComboboxContent, type ComboboxContentProps } from './combobox-content'
import { useComboboxContext } from './combobox-context'
import { ComboboxControl, type ComboboxControlProps } from './combobox-control'
import { ComboboxInput, type ComboboxInputProps } from './combobox-input'
import { ComboboxLabel, type ComboboxLabelProps } from './combobox-label'
import { ComboboxOption, type ComboboxOptionProps } from './combobox-option'
import { ComboboxOptionGroup, type ComboboxOptionGroupProps } from './combobox-option-group'
import {
  ComboboxOptionGroupLabel,
  type ComboboxOptionGroupLabelProps,
} from './combobox-option-group-label'
import { ComboboxPositioner, type ComboboxPositionerProps } from './combobox-positioner'
import { ComboboxTrigger, type ComboboxTriggerProps } from './combobox-trigger'
import { comboboxAnatomy } from './combobox.anatomy'

const Combobox = Object.assign(ComboboxRoot, {
  Root: ComboboxRoot,
  ClearTrigger: ComboboxClearTrigger,
  Content: ComboboxContent,
  Control: ComboboxControl,
  Input: ComboboxInput,
  Label: ComboboxLabel,
  Option: ComboboxOption,
  OptionGroup: ComboboxOptionGroup,
  OptionGroupLabel: ComboboxOptionGroupLabel,
  Positioner: ComboboxPositioner,
  Trigger: ComboboxTrigger,
})

export {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptionGroup,
  ComboboxOptionGroupLabel,
  ComboboxPositioner,
  ComboboxTrigger,
  comboboxAnatomy,
  useComboboxContext,
}
export type {
  ComboboxClearTriggerProps,
  ComboboxContentProps,
  ComboboxControlProps,
  ComboboxInputProps,
  ComboboxLabelProps,
  ComboboxOptionGroupLabelProps,
  ComboboxOptionGroupProps,
  ComboboxOptionProps,
  ComboboxPositionerProps,
  ComboboxProps,
  ComboboxTriggerProps,
}
