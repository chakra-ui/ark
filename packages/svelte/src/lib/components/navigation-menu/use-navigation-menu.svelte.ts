import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import * as navigationMenu from '@zag-js/navigation-menu'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseNavigationMenuProps extends Optional<Omit<navigationMenu.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseNavigationMenuReturn extends Accessor<navigationMenu.Api<PropTypes>> {}

export const useNavigationMenu = (props?: MaybeFunction<UseNavigationMenuProps>): UseNavigationMenuReturn => {
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

  const service = useMachine(navigationMenu.machine, () => machineProps)
  const api = $derived(navigationMenu.connect(service, normalizeProps))
  return () => api
}
