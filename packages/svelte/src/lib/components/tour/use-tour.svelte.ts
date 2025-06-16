import { useEnvironmentContext, useLocaleContext } from '$lib/providers'
import type { Accessor, Optional } from '$lib/types'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as tour from '@zag-js/tour'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseTourProps extends Optional<Omit<tour.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseTourReturn extends Accessor<tour.Api<PropTypes>> {}

export const useTour = (props: MaybeFunction<UseTourProps> = {}): UseTourReturn => {
  const env = useEnvironmentContext() ?? {}
  const locale = useLocaleContext() ?? {}

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
    }
  })

  const service = useMachine(tour.machine, () => machineProps)
  const api = $derived(tour.connect(service, normalizeProps))

  return () => api
}
