import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UsePaginationProps
  extends Optional<Omit<pagination.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial page of the pagination.
   */
  defaultPage?: pagination.Context['page']
}

export interface UsePaginationReturn extends pagination.Api<PropTypes> {}

export const usePagination = (props: UsePaginationProps): UsePaginationReturn => {
  const initialContext: pagination.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    page: props.defaultPage,
  }

  const context: pagination.Context = {
    ...initialContext,
    page: props.page,
    onPageChange: useEvent(props.onPageChange, { sync: true }),
  }

  const [state, send] = useMachine(pagination.machine(initialContext), { context })
  return pagination.connect(state, send, normalizeProps)
}
