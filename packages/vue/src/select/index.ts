import { Select as SelectRoot, type SelectProps } from './select'
import { SelectClearTrigger, type SelectClearTriggerProps } from './select-clear-trigger'
import { SelectContent, type SelectContentProps } from './select-content'
import { useSelectContext } from './select-context'
import { SelectItem, type SelectItemProps } from './select-item'
import { SelectItemGroup, type SelectItemGroupProps } from './select-item-group'
import { SelectItemGroupLabel, type SelectItemGroupLabelProps } from './select-item-group-label'
import { SelectItemIndicator, type SelectItemIndicatorProps } from './select-item-indicator'
import { SelectLabel, type SelectLabelProps } from './select-label'
import { SelectPositioner, type SelectPositionerProps } from './select-positioner'
import { SelectTrigger, type SelectTriggerProps } from './select-trigger'
import { selectAnatomy } from './select.anatomy'

const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  ClearTrigger: SelectClearTrigger,
  Content: SelectContent,
  Item: SelectItem,
  ItemGroup: SelectItemGroup,
  ItemGroupLabel: SelectItemGroupLabel,
  ItemIndicator: SelectItemIndicator,
  Label: SelectLabel,
  Positioner: SelectPositioner,
  Trigger: SelectTrigger,
})

export {
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  selectAnatomy,
  useSelectContext,
}

export type {
  SelectClearTriggerProps,
  SelectContentProps,
  SelectItemGroupLabelProps,
  SelectItemGroupProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectLabelProps,
  SelectPositionerProps,
  SelectProps,
  SelectTriggerProps,
}
