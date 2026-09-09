import * as menu from '@zag-js/menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.tsx'
import type { MaybeAccessor, Optional } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { useMenubarContext } from '../menubar/use-menubar-context.ts'
import { useMenuContext } from './use-menu-context.ts'

export interface UseMenuProps extends Optional<Omit<menu.Props, 'dir' | 'getRootNode' | 'menubar'>, 'id'> {}
export interface UseMenuReturn {
  api: Accessor<menu.Api<PropTypes>>
  service: menu.Service
}

export const useMenu = (props?: MaybeAccessor<UseMenuProps>): UseMenuReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const parentMenu = useMenuContext()
  const menubar = useMenubarContext()

  const machineProps = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
    menubar: parentMenu?.() ? undefined : menubar?.().getMenuContext(),
  }))

  const service = useMachine(menu.machine, machineProps)
  const api = createMemo(() => menu.connect(service, normalizeProps))

  return {
    api,
    service,
  }
}
