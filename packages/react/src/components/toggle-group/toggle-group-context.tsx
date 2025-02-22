import type { ReactNode } from 'react'
import { type UseToggleGroupContext, useToggleGroupContext } from './use-toggle-group-context'

export interface ToggleGroupContextProps {
  children: (context: UseToggleGroupContext) => ReactNode
}

export const ToggleGroupContext = (props: ToggleGroupContextProps) => props.children(useToggleGroupContext())
