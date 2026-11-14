import type { JSX } from '@solidjs/web'
import { type UseRadioGroupItemContext, useRadioGroupItemContext } from './use-radio-group-item-context.ts'

export interface RadioGroupItemContextProps {
  children: (context: UseRadioGroupItemContext) => JSX.Element
}

export const RadioGroupItemContext = (props: RadioGroupItemContextProps) => props.children(useRadioGroupItemContext())
