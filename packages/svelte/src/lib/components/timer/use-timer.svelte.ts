import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as timer from '@zag-js/timer'

export interface UseTimerProps extends Omit<timer.Context, 'dir' | 'getRootNode'> {}
export interface UseTimerReturn extends Accessor<timer.Api<PropTypes>> {}

export const useTimer = (props: UseTimerProps) => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const context = $derived({
    dir: locale.dir,
    getRootNode: env.getRootNode,
    ...props,
  })

  const [state, send] = useMachine(timer.machine(context), { context })
  const api = $derived(() => timer.connect(state, send, normalizeProps))
  return api
}
