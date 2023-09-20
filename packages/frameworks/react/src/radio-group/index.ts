import { RadioGroup as RadioGroupRoot, type RadioGroupProps } from './radio-group'
import { useRadioGroupContext, type RadioGroupContext } from './radio-group-context'
import { RadioGroupItem, type RadioGroupItemProps } from './radio-group-item'
import { useRadioGroupItemContext, type RadioGroupItemContext } from './radio-group-item-context'
import { RadioGroupItemControl, type RadioGroupItemControlProps } from './radio-group-item-control'
import { RadioGroupItemText, type RadioGroupItemTextProps } from './radio-group-item-text'
import { RadioGroupLabel, type RadioGroupLabelProps } from './radio-group-label'

const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
  ItemControl: RadioGroupItemControl,
  ItemText: RadioGroupItemText,
  Label: RadioGroupLabel,
})

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemText,
  RadioGroupLabel,
  useRadioGroupContext,
  useRadioGroupItemContext,
}

export type {
  RadioGroupContext,
  RadioGroupItemContext,
  RadioGroupItemControlProps,
  RadioGroupItemProps,
  RadioGroupItemTextProps,
  RadioGroupLabelProps,
  RadioGroupProps,
}
