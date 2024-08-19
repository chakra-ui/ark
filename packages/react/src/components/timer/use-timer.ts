import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as timer from '@zag-js/timer'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseTimerProps extends Optional<Omit<timer.Context, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTimerReturn extends timer.Api<PropTypes> {}

export const useTimer = (props: UseTimerProps): UseTimerReturn => {
  const env = useEnvironmentContext()

  const initialContext: timer.Context = {
    id: useId(),
    getRootNode: env.getRootNode,
    ...props,
  }

  const context: timer.Context = {
    ...initialContext,
    onComplete: useEvent(props.onComplete),
    onTick: useEvent(props.onTick),
  }

  const [state, send] = useMachine(timer.machine(initialContext), { context })

  return timer.connect(state, send, normalizeProps)
}
