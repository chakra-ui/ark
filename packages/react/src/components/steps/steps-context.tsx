import type { ReactNode } from 'react'
import { type UseStepsContext, useStepsContext } from './use-steps-context'

export interface StepsContextProps {
  children: (context: UseStepsContext) => ReactNode
}

export const StepsContext = (props: StepsContextProps) => {
  const context = useStepsContext()
  return props.children(context)
}

StepsContext.displayName = 'StepsContext'
