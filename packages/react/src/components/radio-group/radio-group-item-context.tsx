import type { ReactNode } from 'react'
import { type UseRadioGroupItemContext, useRadioGroupItemContext } from './use-radio-group-item-context'

export interface RadioGroupItemContextProps {
  children: (context: UseRadioGroupItemContext) => ReactNode
}

export const RadioGroupItemContext = (props: RadioGroupItemContextProps) => props.children(useRadioGroupItemContext())
