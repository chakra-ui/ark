import type { JSX } from 'solid-js'
import { type UseToggleContext, useToggleContext } from './use-toggle-context'

export interface ToggleContextProps {
  children: (context: UseToggleContext) => JSX.Element
}

export const ToggleContext = (props: ToggleContextProps) => props.children(useToggleContext())
