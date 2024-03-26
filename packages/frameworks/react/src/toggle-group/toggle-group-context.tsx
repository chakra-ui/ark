import { useToggleGroupContext, type UseToggleGroupContext } from './use-toggle-group-context'

export interface ToggleGroupContextProps {
  children: (context: UseToggleGroupContext) => React.ReactNode
}

export const ToggleGroupContext = (props: ToggleGroupContextProps) =>
  props.children(useToggleGroupContext())
