import type { JSX } from '@solidjs/web'
import { type UseToggleContext, useToggleContext } from './use-toggle-context.ts'

export interface ToggleContextProps {
  children: (context: UseToggleContext) => JSX.Element
}

export const ToggleContext = (props: ToggleContextProps) => props.children(useToggleContext())
