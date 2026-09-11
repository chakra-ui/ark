import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as menubar from '@zag-js/menubar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'

export interface UseMenubarProps extends Omit<menubar.Props, 'dir' | 'getRootNode'> {}
export interface UseMenubarReturn extends Accessor<menubar.Api<PropTypes>> {}

export const useMenubar = (props?: MaybeFunction<UseMenubarProps>): UseMenubarReturn => {
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

  const service = useMachine(menubar.machine, () => machineProps)
  const api = $derived(menubar.connect(service, normalizeProps))
  return () => api
}
