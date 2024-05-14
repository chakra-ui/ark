import type { JSX } from 'solid-js'
import { type UseCheckboxContext, useCheckboxContext } from './use-checkbox-context'

export interface CheckboxContextProps {
  children: (context: UseCheckboxContext) => JSX.Element
}

export const CheckboxContext = (props: CheckboxContextProps) => props.children(useCheckboxContext())
