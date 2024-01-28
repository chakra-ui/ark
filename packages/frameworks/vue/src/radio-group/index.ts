import type { ValueChangeDetails as RadioGroupValueChangeDetails } from '@zag-js/radio-group'
import { useRadioGroupContext, type RadioGroupContext } from './radio-group-context'
import { RadioGroupIndicator, type RadioGroupIndicatorProps } from './radio-group-indicator'
import { RadioGroupItem, type RadioGroupItemProps } from './radio-group-item'
import { useRadioGroupItemContext, type RadioGroupItemContext } from './radio-group-item-context'
import { RadioGroupItemControl, type RadioGroupItemControlProps } from './radio-group-item-control'
import { RadioGroupItemText, type RadioGroupItemTextProps } from './radio-group-item-text'
import { RadioGroupLabel, type RadioGroupLabelProps } from './radio-group-label'
import { RadioGroupRoot, type RadioGroupRootProps } from './radio-group-root'

export const RadioGroup = {
  Root: RadioGroupRoot,
  Indicator: RadioGroupIndicator,
  Item: RadioGroupItem,
  ItemControl: RadioGroupItemControl,
  ItemText: RadioGroupItemText,
  Label: RadioGroupLabel,
}

export {
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemText,
  RadioGroupLabel,
  RadioGroupRoot,
  useRadioGroupContext,
  useRadioGroupItemContext,
}

export type {
  RadioGroupContext,
  RadioGroupIndicatorProps,
  RadioGroupItemContext,
  RadioGroupItemControlProps,
  RadioGroupItemProps,
  RadioGroupItemTextProps,
  RadioGroupLabelProps,
  RadioGroupRootProps,
  RadioGroupValueChangeDetails,
}
