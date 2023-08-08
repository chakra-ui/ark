import { Radio, type RadioProps } from './radio'
import { useRadioContext } from './radio-context'
import { RadioControl, type RadioControlProps } from './radio-control'
import { RadioGroup as RadioGroupRoot, type RadioGroupProps } from './radio-group'
import { useRadioGroupContext } from './radio-group-context'
import { RadioGroupLabel, type RadioGroupLabelProps } from './radio-group-label'
import { radioGroupAnatomy } from './radio-group.anatomy'
import { RadioInput, type RadioInputProps } from './radio-input'
import { RadioLabel, type RadioLabelProps } from './radio-label'

const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Label: RadioGroupLabel,
  Radio: Radio,
  RadioInput: RadioInput,
  RadioLabel: RadioLabel,
  RadioControl: RadioControl,
})

export {
  Radio,
  RadioControl,
  RadioGroup,
  RadioGroupLabel,
  RadioInput,
  RadioLabel,
  radioGroupAnatomy,
  useRadioContext,
  useRadioGroupContext,
}

export type {
  RadioControlProps,
  RadioGroupLabelProps,
  RadioGroupProps,
  RadioInputProps,
  RadioLabelProps,
  RadioProps,
}
