import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UsePaginationProps extends Optional<Omit<pagination.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePaginationReturn extends pagination.Api<PropTypes> {}

export const usePagination = (props: UsePaginationProps = {}): UsePaginationReturn => {
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
