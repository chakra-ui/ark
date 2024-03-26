import type { ReactNode } from 'react'
import { useCheckboxContext, type UseCheckboxContext } from './use-checkbox-context'

export interface CheckboxContextProps {
  children: (context: UseCheckboxContext) => ReactNode
}

export const CheckboxContext = (props: CheckboxContextProps) => props.children(useCheckboxContext())
