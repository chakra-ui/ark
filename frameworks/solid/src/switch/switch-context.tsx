import type { JSX } from 'solid-js'
import { useSwitchContext, type UseSwitchContext } from './use-switch-context'

export interface SwitchContextProps {
  children: (context: UseSwitchContext) => JSX.Element
}

export const SwitchContext = (props: SwitchContextProps) => props.children(useSwitchContext())
