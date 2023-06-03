import * as pagination from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UsePaginationProps = Optional<pagination.Context, 'id'> & {
  defaultPage?: pagination.Context['page']
}

export const usePagination = (props: UsePaginationProps) => {
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

export type UsePaginationReturn = ReturnType<typeof usePagination>
