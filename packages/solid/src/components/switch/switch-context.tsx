import type { JSX } from '@solidjs/web'
import { type UseSwitchContext, useSwitchContext } from './use-switch-context.ts'

export interface SwitchContextProps {
  children: (context: UseSwitchContext) => JSX.Element
}

export const SwitchContext = (props: SwitchContextProps) => props.children(useSwitchContext())
