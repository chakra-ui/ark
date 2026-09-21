'use client'

import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'

export interface UsePaginationProps extends Optional<Omit<pagination.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePaginationReturn extends pagination.Api<PropTypes> {
  /**
   * Whether the items and triggers navigate as links or act as buttons.
   */
  type: 'button' | 'link'
}

export const usePagination = (props?: UsePaginationProps): UsePaginationReturn => {
  const id = useId()
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const machineProps: pagination.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(pagination.machine, machineProps)
  const api = pagination.connect(service, normalizeProps)

  return { ...api, type: machineProps.type ?? 'button' }
}
