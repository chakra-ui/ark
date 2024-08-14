import type { ReactNode } from 'react'
import { type UseStepsItemContext, useStepsItemContext } from './use-steps-item-context'

export interface StepsItemContextProps {
  children: (context: UseStepsItemContext) => ReactNode
}

export const StepsItemContext = (props: StepsItemContextProps) => {
  return props.children(useStepsItemContext())
}

StepsItemContext.displayName = 'StepsItemContext'
