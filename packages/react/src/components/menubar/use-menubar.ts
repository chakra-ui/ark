'use client'

import * as menubar from '@zag-js/menubar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'

export interface UseMenubarProps extends Optional<Omit<menubar.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseMenubarReturn extends menubar.Api<PropTypes> {}

export const useMenubar = (props?: UseMenubarProps): UseMenubarReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const context: menubar.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(menubar.machine, context)
  return menubar.connect(service, normalizeProps)
}
