import type { JSX } from 'solid-js'
import { type UseSwitchContext, useSwitchContext } from './use-switch-context'

export interface SwitchContextProps {
  children: (context: UseSwitchContext) => JSX.Element
}

export const SwitchContext = (props: SwitchContextProps) => props.children(useSwitchContext())
