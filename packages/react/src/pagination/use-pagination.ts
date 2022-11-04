import * as pagination from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UsePaginationProps = Omit<pagination.Context, 'id'>

export const usePagination = (props: UsePaginationProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
  })

  const [state, send] = useMachine(pagination.machine(initialContext), { context: initialContext })
  return pagination.connect(state, send, normalizeProps)
}

export type UsePaginationReturn = ReturnType<typeof usePagination>
