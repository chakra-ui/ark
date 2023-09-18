import { Radio, type RadioProps } from './radio'
import { useRadioContext, type RadioContext } from './radio-context'
import { RadioControl, type RadioControlProps } from './radio-control'
import { RadioGroup as RadioGroupRoot, type RadioGroupProps } from './radio-group'
import { useRadioGroupContext, type RadioGroupContext } from './radio-group-context'
import { RadioGroupLabel, type RadioGroupLabelProps } from './radio-group-label'
import { radioGroupAnatomy } from './radio-group.anatomy'
import { RadioLabel, type RadioLabelProps } from './radio-label'

const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Label: RadioGroupLabel,
  Radio: Radio,
  RadioLabel: RadioLabel,
  RadioControl: RadioControl,
})

export {
  Radio,
  RadioControl,
  RadioGroup,
  RadioGroupLabel,
  RadioLabel,
  radioGroupAnatomy,
  useRadioContext,
  useRadioGroupContext,
}

export type {
  RadioContext,
  RadioControlProps,
  RadioGroupContext,
  RadioGroupLabelProps,
  RadioGroupProps,
  RadioLabelProps,
  RadioProps,
}
