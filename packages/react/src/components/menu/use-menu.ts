import * as menu from '@zag-js/menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseMenuProps extends Optional<Omit<menu.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseMenuReturn {
  api: menu.Api<PropTypes>
  service: menu.Service
}

export const useMenu = (props?: UseMenuProps): UseMenuReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: menu.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(menu.machine, machineProps)
  const api = menu.connect(service, normalizeProps)

  return { api, service }
}
