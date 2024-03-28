import type { JSX } from 'solid-js'
import { useRadioGroupContext, type UseRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupContextProps {
  children: (context: UseRadioGroupContext) => JSX.Element
}

export const RadioGroupContext = (props: RadioGroupContextProps) =>
  props.children(useRadioGroupContext())
