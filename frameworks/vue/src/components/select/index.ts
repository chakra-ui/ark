import type {
  HighlightChangeDetails as SelectHighlightChangeDetails,
  OpenChangeDetails as SelectOpenChangeDetails,
  ValueChangeDetails as SelectValueChangeDetails,
} from '@zag-js/select'
import type { CollectionItem } from '~/types'
import { SelectClearTrigger, type SelectClearTriggerProps } from './select-clear-trigger'
import { SelectContent, type SelectContentProps } from './select-content'
import { type SelectContext, useSelectContext } from './select-context'
import { SelectControl, type SelectControlProps } from './select-control'
import { SelectIndicator, type SelectIndicatorProps } from './select-indicator'
import { SelectItem, type SelectItemProps } from './select-item'
import { type SelectItemContext, useSelectItemContext } from './select-item-context'
import { SelectItemGroup, type SelectItemGroupProps } from './select-item-group'
import { SelectItemGroupLabel, type SelectItemGroupLabelProps } from './select-item-group-label'
import { SelectItemIndicator, type SelectItemIndicatorProps } from './select-item-indicator'
import { SelectItemText, type SelectItemTextProps } from './select-item-text'
import { SelectLabel, type SelectLabelProps } from './select-label'
import { SelectPositioner, type SelectPositionerProps } from './select-positioner'
import { SelectRoot, type SelectRootProps } from './select-root'
import { SelectTrigger, type SelectTriggerProps } from './select-trigger'
import { SelectValueText, type SelectValueTextProps } from './select-value-text'

export * as Select from './select'

export {
  SelectClearTrigger,
  SelectContent,
  SelectControl,
  SelectIndicator,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  useSelectContext,
  useSelectItemContext,
}

export type {
  CollectionItem,
  SelectClearTriggerProps,
  SelectContentProps,
  SelectContext,
  SelectControlProps,
  SelectHighlightChangeDetails,
  SelectIndicatorProps,
  SelectItemContext,
  SelectItemGroupLabelProps,
  SelectItemGroupProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectOpenChangeDetails,
  SelectPositionerProps,
  SelectRootProps,
  SelectTriggerProps,
  SelectValueChangeDetails,
  SelectValueTextProps,
}
