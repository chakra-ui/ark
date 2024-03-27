import type { JSX } from 'solid-js'
import { useCheckboxContext, type UseCheckboxContext } from './use-checkbox-context'

export interface CheckboxContextProps {
  children: (context: UseCheckboxContext) => JSX.Element
}

export const CheckboxContext = (props: CheckboxContextProps) => props.children(useCheckboxContext())
