import type { JSX } from '@solidjs/web'
import { type UseToggleGroupContext, useToggleGroupContext } from './use-toggle-group-context.ts'

export interface ToggleGroupContextProps {
  children: (context: UseToggleGroupContext) => JSX.Element
}

export const ToggleGroupContext = (props: ToggleGroupContextProps) => props.children(useToggleGroupContext())
