import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as toggleGroup from '@zag-js/toggle-group'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseToggleGroupProps extends Optional<Omit<toggleGroup.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseToggleGroupReturn extends Accessor<toggleGroup.Api<PropTypes>> {}

export const useToggleGroup = (props: MaybeFunction<UseToggleGroupProps> = {}): UseToggleGroupReturn => {
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

  const service = useMachine(toggleGroup.machine, () => machineProps)

  const api = $derived(toggleGroup.connect(service, normalizeProps))

  return () => api
}
