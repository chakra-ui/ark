import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UsePaginationProps
  extends Optional<Omit<pagination.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial page of the pagination when it is first rendered.
   * Use when you do not need to control the state of the pagination.
   */
  defaultPage?: pagination.Context['page']
}
export interface UsePaginationReturn extends Accessor<pagination.Api<PropTypes>> {}

export const usePagination = (props: UsePaginationProps): UsePaginationReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    page: props.defaultPage,
    ...props,
  }))

  const [state, send] = useMachine(pagination.machine(context()), { context })
  return createMemo(() => pagination.connect(state, send, normalizeProps))
}
