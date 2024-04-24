import type { ReactNode } from 'react'
import { type UseCheckboxContext, useCheckboxContext } from './use-checkbox-context'

export interface CheckboxContextProps {
  children: (context: UseCheckboxContext) => ReactNode
}

export const CheckboxContext = (props: CheckboxContextProps) => props.children(useCheckboxContext())
