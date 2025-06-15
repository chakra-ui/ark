import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as toggle from '@zag-js/toggle'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseToggleProps extends Omit<toggle.Props, 'dir' | 'getRootNode'> {}

export interface UseToggleReturn extends Accessor<toggle.Api<PropTypes>> {}

export const useToggle = (props: MaybeFunction<UseToggleProps> = {}): UseToggleReturn => {
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

  const service = useMachine(toggle.machine, () => machineProps)
  const api = $derived(toggle.connect(service, normalizeProps))

  return () => api
}
