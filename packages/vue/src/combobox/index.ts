import { Combobox as ComboboxRoot, type ComboboxProps } from './combobox'
import { ComboboxClearTrigger, type ComboboxClearTriggerProps } from './combobox-clear-trigger'
import { ComboboxContent, type ComboboxContentProps } from './combobox-content'
import { useComboboxContext } from './combobox-context'
import { ComboboxControl, type ComboboxControlProps } from './combobox-control'
import { ComboboxInput, type ComboboxInputProps } from './combobox-input'
import { ComboboxItem, type ComboboxItemProps } from './combobox-item'
import { ComboboxItemGroup, type ComboboxItemGroupProps } from './combobox-item-group'
import {
  ComboboxItemGroupLabel,
  type ComboboxItemGroupLabelProps,
} from './combobox-item-group-label'
import { ComboboxItemIndicator, type ComboboxItemIndicatorProps } from './combobox-item-indicator'
import { ComboboxLabel, type ComboboxLabelProps } from './combobox-label'
import { ComboboxPositioner, type ComboboxPositionerProps } from './combobox-positioner'
import { ComboboxTrigger, type ComboboxTriggerProps } from './combobox-trigger'
import { comboboxAnatomy } from './combobox.anatomy'

const Combobox = Object.assign(ComboboxRoot, {
  Root: ComboboxRoot,
  ClearTrigger: ComboboxClearTrigger,
  Content: ComboboxContent,
  Control: ComboboxControl,
  Input: ComboboxInput,
  Item: ComboboxItem,
  ItemGroup: ComboboxItemGroup,
  ItemGroupLabel: ComboboxItemGroupLabel,
  ItemIndicator: ComboboxItemIndicator,
  Label: ComboboxLabel,
  Positioner: ComboboxPositioner,
  Trigger: ComboboxTrigger,
})

export {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxLabel,
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
  ComboboxItemGroupLabelProps,
  ComboboxItemGroupProps,
  ComboboxItemIndicatorProps,
  ComboboxItemProps,
  ComboboxLabelProps,
  ComboboxPositionerProps,
  ComboboxProps,
  ComboboxTriggerProps,
}
