import * as pagination from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import type { Optional } from '../types'

export type UsePaginationProps = Optional<pagination.Context, 'id'>

export const usePagination = (props: UsePaginationProps) => {
  const context = {
    id: createUniqueId(),
    ...props,
  }

  const [state, send] = useMachine(pagination.machine(context), { context })
  return createMemo(() => pagination.connect(state, send, normalizeProps))
}

export type UsePaginationReturn = ReturnType<typeof usePagination>
