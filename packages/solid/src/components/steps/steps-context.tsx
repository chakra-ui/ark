import type { JSX } from 'solid-js'
import { type UseStepsContext, useStepsContext } from './use-steps-context'

export interface StepsContextProps {
  children: (context: UseStepsContext) => JSX.Element
}

export const StepsContext = (props: StepsContextProps) => {
  const context = useStepsContext()
  return props.children(context)
}
