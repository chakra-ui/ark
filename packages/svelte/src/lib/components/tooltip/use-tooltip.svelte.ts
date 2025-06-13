import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as tooltip from '@zag-js/tooltip'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseTooltipProps extends Omit<tooltip.Props, 'dir' | 'getRootNode'> {}
export interface UseTooltipReturn extends Accessor<tooltip.Api<PropTypes>> {}

export const useTooltip = (props?: MaybeFunction<UseTooltipProps>): UseTooltipReturn => {
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

  const service = useMachine(tooltip.machine, () => machineProps)
  const api = $derived(tooltip.connect(service, normalizeProps))
  return () => api
}
