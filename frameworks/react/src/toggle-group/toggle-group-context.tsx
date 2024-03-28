import type { ReactNode } from 'react'
import { useToggleGroupContext, type UseToggleGroupContext } from './use-toggle-group-context'

export interface ToggleGroupContextProps {
  children: (context: UseToggleGroupContext) => ReactNode
}

export const ToggleGroupContext = (props: ToggleGroupContextProps) =>
  props.children(useToggleGroupContext())
