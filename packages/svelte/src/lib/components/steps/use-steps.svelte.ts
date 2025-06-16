import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import * as steps from '@zag-js/steps'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseStepsProps extends Optional<Omit<steps.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseStepsReturn extends Accessor<steps.Api<PropTypes>> {}

export const useSteps = (props?: MaybeFunction<UseStepsProps>) => {
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

  const service = useMachine(steps.machine, () => machineProps)
  const api = $derived(steps.connect(service, normalizeProps))

  return () => api
}
