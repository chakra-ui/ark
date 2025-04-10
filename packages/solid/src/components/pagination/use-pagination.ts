import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'

export interface UsePaginationProps extends Optional<Omit<pagination.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePaginationReturn extends Accessor<pagination.Api<PropTypes>> {}

export const usePagination = (props?: MaybeAccessor<UsePaginationProps>): UsePaginationReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const machineProps = createMemo<pagination.Props>(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(pagination.machine, machineProps)
  return createMemo(() => pagination.connect(service, normalizeProps))
}
