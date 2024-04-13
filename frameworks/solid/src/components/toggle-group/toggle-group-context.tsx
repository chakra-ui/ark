import type { JSX } from 'solid-js'
import { type UseToggleGroupContext, useToggleGroupContext } from './use-toggle-group-context'

export interface ToggleGroupContextProps {
  children: (context: UseToggleGroupContext) => JSX.Element
}

export const ToggleGroupContext = (props: ToggleGroupContextProps) =>
  props.children(useToggleGroupContext())
