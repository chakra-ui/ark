import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as tabs from '@zag-js/tabs'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseTabsProps extends Optional<Omit<tabs.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTabsReturn extends Accessor<tabs.Api<PropTypes>> {}

export const useTabs = (props?: MaybeFunction<UseTabsProps>): UseTabsReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const machineProps = $derived.by(() => {
    const localProps = runIfFn(props)
    return {
      ...localProps,
      dir: locale().dir,
      getRootNode: env().getRootNode,
    }
  })

  const service = useMachine(tabs.machine, () => machineProps)
  const api = $derived(tabs.connect(service, normalizeProps))

  return () => api
}
