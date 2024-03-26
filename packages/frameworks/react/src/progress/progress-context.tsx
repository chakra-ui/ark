import { useProgressContext, type UseProgressContext } from './use-progress-context'

export interface ProgressContextProps {
  children: (context: UseProgressContext) => React.ReactNode
}

export const ProgressContext = (props: ProgressContextProps) => props.children(useProgressContext())
