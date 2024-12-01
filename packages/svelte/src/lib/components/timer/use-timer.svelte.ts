import { useEnvironmentContext } from '$lib/providers/environment'
import type { Accessor, Optional } from '$lib/types'
import { createId } from '$lib/utils/create-id'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as timer from '@zag-js/timer'

export interface UseTimerProps extends Optional<Omit<timer.Context, 'getRootNode'>, 'id'> {}
export interface UseTimerReturn extends Accessor<timer.Api<PropTypes>> {}

export const useTimer = (props: UseTimerProps = {}) => {
  const { getRootNode } = useEnvironmentContext()

  const context = $derived({
    id: createId(),
    getRootNode,
    ...props,
  })

  const [state, send] = useMachine(timer.machine(context), { context })
  const api = $derived(() => timer.connect(state, send, normalizeProps))
  return api
}
