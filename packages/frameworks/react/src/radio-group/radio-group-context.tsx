import type { ReactNode } from 'react'
import { useRadioGroupContext, type UseRadioGroupContext } from './use-radio-group-context'

export interface RadioGroupContextProps {
  children: (context: UseRadioGroupContext) => ReactNode
}

export const RadioGroupContext = (props: RadioGroupContextProps) =>
  props.children(useRadioGroupContext())
