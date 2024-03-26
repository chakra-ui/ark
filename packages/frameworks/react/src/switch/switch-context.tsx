import type { ReactNode } from 'react'
import { useSwitchContext, type UseSwitchContext } from './use-switch-context'

export interface SwitchContextProps {
  children: (context: UseSwitchContext) => ReactNode
}

export const SwitchContext = (props: SwitchContextProps) => props.children(useSwitchContext())
