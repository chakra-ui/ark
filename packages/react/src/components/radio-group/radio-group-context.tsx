import type { ReactNode } from 'react'
import { type UseRadioGroupContext, useRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupContextProps {
  children: (context: UseRadioGroupContext) => ReactNode
}

export const RadioGroupContext = (props: RadioGroupContextProps) => props.children(useRadioGroupContext())
