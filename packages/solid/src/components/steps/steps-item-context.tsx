import type { JSX } from 'solid-js'
import { type UseStepsItemContext, useStepsItemContext } from './use-steps-item-context'

export interface StepsItemContextProps {
  children: (context: UseStepsItemContext) => JSX.Element
}

export const StepsItemContext = (props: StepsItemContextProps) => {
  return props.children(useStepsItemContext())
}

StepsItemContext.displayName = 'StepsItemContext'
