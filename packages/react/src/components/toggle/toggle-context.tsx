import type { ReactNode } from 'react'
import { type UseToggleContext, useToggleContext } from './use-toggle-context'

export interface ToggleContextProps {
  children: (context: UseToggleContext) => ReactNode
}

export const ToggleContext = (props: ToggleContextProps) => props.children(useToggleContext())
