import * as pagination from '@zag-js/pagination'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export interface UsePaginationProps extends Optional<pagination.Context, 'id'> {}
export interface UsePaginationReturn extends Accessor<pagination.Api<PropTypes>> {}

export const usePagination = (props: UsePaginationProps): UsePaginationReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(pagination.machine(context), { context })
  return createMemo(() => pagination.connect(state, send, normalizeProps))
}
