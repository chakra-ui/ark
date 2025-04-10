import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as timer from '@zag-js/timer'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UseTimerProps extends Optional<Omit<timer.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTimerReturn extends Accessor<timer.Api<PropTypes>> {}

export const useTimer = (props?: MaybeAccessor<UseTimerProps>): UseTimerReturn => {
  const id = createUniqueId()
  const environment = useEnvironmentContext()

  const machineProps = createMemo<timer.Props>(() => ({
    id,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(timer.machine, machineProps)
  return createMemo(() => timer.connect(service, normalizeProps))
}
