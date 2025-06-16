import { runIfFn } from '$lib/utils/run-if-fn'
import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'
import type { MaybeFunction } from '@zag-js/utils'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Accessor, Optional } from '../../types'

export interface UsePaginationProps extends Optional<Omit<pagination.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePaginationReturn extends Accessor<pagination.Api<PropTypes>> {}

export const usePagination = (props: MaybeFunction<UsePaginationProps> = {}): UsePaginationReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const resolvedProps = $derived.by(() => {
    const localProps = runIfFn(props)
    return {
      dir: locale().dir,
      getRootNode: env().getRootNode,
      ...localProps,
    }
  })

  const service = useMachine(pagination.machine, () => resolvedProps)
  const api = $derived(pagination.connect(service, normalizeProps))

  return () => api
}
