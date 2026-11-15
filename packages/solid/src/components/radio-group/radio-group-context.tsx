import type { JSX } from '@solidjs/web'
import { type UseRadioGroupContext, useRadioGroupContext } from './use-radio-group-context.ts'

export interface RadioGroupContextProps {
  children: (context: UseRadioGroupContext) => JSX.Element
}

export const RadioGroupContext = (props: RadioGroupContextProps) => props.children(useRadioGroupContext())
