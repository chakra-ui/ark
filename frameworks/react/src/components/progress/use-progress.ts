import * as progress from '@zag-js/progress'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'

export interface UseProgressProps extends Optional<progress.Context, 'id'> {
  /**
   * The initial value of the progress.
   */
  defaultValue?: progress.Context['value']
}

export interface UseProgressReturn extends progress.Api<PropTypes> {}

export const useProgress = (props: UseProgressProps): UseProgressReturn => {
  const initialContext: progress.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: progress.Context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(progress.machine(initialContext), { context })
  return progress.connect(state, send, normalizeProps)
}
