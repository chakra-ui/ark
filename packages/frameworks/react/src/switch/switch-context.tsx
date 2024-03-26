import { useSwitchContext, type UseSwitchContext } from './use-switch-context'

export interface SwitchContextProps {
  children: (context: UseSwitchContext) => React.ReactNode
}

export const SwitchContext = (props: SwitchContextProps) => props.children(useSwitchContext())
