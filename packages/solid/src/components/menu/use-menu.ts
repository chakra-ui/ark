import * as menu from '@zag-js/menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseMenuProps extends Optional<Omit<menu.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseMenuReturn {
  api: Accessor<menu.Api<PropTypes>>
  service: menu.Service
}

export const useMenu = (props: UseMenuProps = {}): UseMenuReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const machineProps = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...props,
  }))

  const service = useMachine(menu.machine, machineProps)
  const api = createMemo(() => menu.connect(service, normalizeProps))

  return {
    api,
    service,
  }
}
