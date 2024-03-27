import type { JSX } from 'solid-js'
import { useToggleGroupContext, type UseToggleGroupContext } from './use-toggle-group-context'

export interface ToggleGroupContextProps {
  children: (context: UseToggleGroupContext) => JSX.Element
}

export const ToggleGroupContext = (props: ToggleGroupContextProps) =>
  props.children(useToggleGroupContext())
