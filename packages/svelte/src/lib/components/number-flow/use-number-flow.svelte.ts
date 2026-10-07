import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as numberFlow from '@zag-js/number-flow'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseNumberFlowProps extends Omit<numberFlow.Props, 'dir' | 'getRootNode'> {}
export interface UseNumberFlowReturn extends Accessor<numberFlow.Api<PropTypes>> {}

export const useNumberFlow = (props: MaybeFunction<UseNumberFlowProps>) => {
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

  const service = useMachine(numberFlow.machine, () => machineProps)
  const api = $derived(numberFlow.connect(service, normalizeProps))
  return () => api
}
