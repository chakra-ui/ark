import * as pagination from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import type { OptionalId } from '../types'

export type UsePaginationProps = OptionalId<pagination.Context>

export const usePagination = (props: UsePaginationProps) => {
  const context = {
    id: useId(),
    ...props,
  }

  const [state, send] = useMachine(pagination.machine(context), { context })
  return pagination.connect(state, send, normalizeProps)
}

export type UsePaginationReturn = ReturnType<typeof usePagination>
