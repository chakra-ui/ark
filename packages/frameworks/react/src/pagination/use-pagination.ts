import * as pagination from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UsePaginationProps extends Optional<pagination.Context, 'id'> {
  defaultPage?: pagination.Context['page']
}
export type UsePaginationReturn = pagination.Api

export const usePagination = (props: UsePaginationProps): UsePaginationReturn => {
  const getRootNode = useEnvironmentContext()

  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    page: props.defaultPage,
  }

  const context = {
    ...initialContext,
    page: props.page,
  }

  const [state, send] = useMachine(pagination.machine(initialContext), { context })
  return pagination.connect(state, send, normalizeProps)
}
