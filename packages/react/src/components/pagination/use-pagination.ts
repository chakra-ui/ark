'use client'

import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'
import type { HTMLProps } from '../factory.ts'

/**
 * The anchor attributes the items and triggers accept, since they render as links under `type="link"`.
 */
export type PaginationAnchorProps = Omit<HTMLProps<'a'>, keyof HTMLProps<'button'>>

export interface UsePaginationProps extends Optional<Omit<pagination.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePaginationReturn extends pagination.Api<PropTypes> {}

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
  return pagination.connect(service, normalizeProps)
}
