import type { JSX } from 'solid-js'
import { type UseRadioGroupContext, useRadioGroupContext } from './use-radio-group-context.ts'

export interface RadioGroupContextProps {
  children: (context: UseRadioGroupContext) => JSX.Element
}

export const RadioGroupContext = (props: RadioGroupContextProps) => props.children(useRadioGroupContext())
