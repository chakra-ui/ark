import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor } from '$lib/types'
import * as menu from '@zag-js/menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useMenubarContext } from '../menubar/use-menubar-context.ts'
import { useMenuContext } from './use-menu-context.ts'

export interface UseMenuProps extends Omit<menu.Props, 'dir' | 'getRootNode' | 'menubar'> {}
export interface UseMenuReturn extends Accessor<{
  api: menu.Api<PropTypes>
  service: menu.Service
}> {}

export const useMenu = (props: MaybeFunction<UseMenuProps>): UseMenuReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()
  const parentMenu = useMenuContext()
  const menubar = useMenubarContext()

  const machineProps = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...resolvedProps,
      menubar: parentMenu?.() ? undefined : menubar?.().getMenuContext(),
    }
  })

  const service = useMachine(menu.machine, () => machineProps)
  const api = $derived(menu.connect(service, normalizeProps))

  return () => ({ api, service })
}
