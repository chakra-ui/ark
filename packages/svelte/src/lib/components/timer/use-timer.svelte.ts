import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as timer from '@zag-js/timer'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseTimerProps extends Omit<timer.Props, 'dir' | 'getRootNode'> {}
export interface UseTimerReturn extends Accessor<timer.Api<PropTypes>> {}

export const useTimer = (props: MaybeFunction<UseTimerProps>) => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(timer.machine, () => machineProps)
  const api = $derived(timer.connect(service, normalizeProps))
  return () => api
}
