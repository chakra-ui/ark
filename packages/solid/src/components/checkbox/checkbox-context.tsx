import type { JSX } from '@solidjs/web'
import { type UseCheckboxContext, useCheckboxContext } from './use-checkbox-context.ts'

export interface CheckboxContextProps {
  children: (context: UseCheckboxContext) => JSX.Element
}

export const CheckboxContext = (props: CheckboxContextProps) => props.children(useCheckboxContext())
