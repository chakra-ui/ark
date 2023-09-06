import { Select as SelectRoot, type SelectProps } from './select'
import { SelectClearTrigger, type SelectClearTriggerProps } from './select-clear-trigger'
import { SelectContent, type SelectContentProps } from './select-content'
import { useSelectContext } from './select-context'
import { SelectIndicator, type SelectIndicatorProps } from './select-indicator'
import { SelectItem, type SelectItemProps } from './select-item'
import { SelectItemGroup, type SelectItemGroupProps } from './select-item-group'
import { SelectItemGroupLabel, type SelectItemGroupLabelProps } from './select-item-group-label'
import { SelectLabel, type SelectLabelProps } from './select-label'
import { SelectPositioner, type SelectPositionerProps } from './select-positioner'
import { SelectTrigger, type SelectTriggerProps } from './select-trigger'
import { selectAnatomy } from './select.anatomy'

const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  ClearTrigger: SelectClearTrigger,
  Content: SelectContent,
  Indicator: SelectIndicator,
  Item: SelectItem,
  ItemGroup: SelectItemGroup,
  ItemGroupLabel: SelectItemGroupLabel,
  Label: SelectLabel,
  Positioner: SelectPositioner,
  Trigger: SelectTrigger,
})

export {
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  selectAnatomy,
  useSelectContext,
}

export type {
  SelectClearTriggerProps,
  SelectContentProps,
  SelectIndicatorProps,
  SelectItemGroupLabelProps,
  SelectItemGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectPositionerProps,
  SelectProps,
  SelectTriggerProps,
}
