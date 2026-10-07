import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as meter from '@zag-js/meter'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseMeterProps extends Omit<meter.Props, 'dir' | 'getRootNode'> {}
export interface UseMeterReturn extends Accessor<meter.Api<PropTypes>> {}

export const useMeter = (props: MaybeFunction<UseMeterProps>) => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      locale: locale().locale,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(meter.machine, () => machineProps)
  const api = $derived(meter.connect(service, normalizeProps))
  return () => api
}
