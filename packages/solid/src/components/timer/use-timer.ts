import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as timer from '@zag-js/timer'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTimerProps extends Optional<Omit<timer.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTimerReturn extends Accessor<timer.Api<PropTypes>> {}

export const useTimer = (props: UseTimerProps): UseTimerReturn => {
  const env = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    getRootNode: env().getRootNode,
    ...props,
  }))

  const [state, send] = useMachine(timer.machine(context()), { context })

  return createMemo(() => timer.connect(state, send, normalizeProps))
}
