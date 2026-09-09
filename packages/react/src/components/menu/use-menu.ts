'use client'

import * as menu from '@zag-js/menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'
import { useMenubarContext } from '../menubar/use-menubar-context.ts'
import { useMenuContext } from './use-menu-context.ts'

export interface UseMenuProps extends Optional<Omit<menu.Props, 'dir' | 'getRootNode' | 'menubar'>, 'id'> {}
export interface UseMenuReturn {
  api: menu.Api<PropTypes>
  service: menu.Service
}

export const useMenu = (props?: UseMenuProps): UseMenuReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const parentMenu = useMenuContext()
  const menubar = useMenubarContext()

  const machineProps: menu.Props = {
    id,
    dir,
    getRootNode,
    ...props,
    menubar: parentMenu ? undefined : menubar?.getMenuContext(),
  }

  const service = useMachine(menu.machine, machineProps)
  const api = menu.connect(service, normalizeProps)

  return { api, service }
}
