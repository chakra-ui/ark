import { connect, machine, type Context as PaginationContext } from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { transformComposableProps, useId } from '../utils'

type UsePaginationPropsContext = Optional<PaginationContext, 'id'>

export type UsePaginationProps = {
  context: UsePaginationPropsContext
  emit: CallableFunction
}

export const usePagination = (props: UsePaginationProps) => {
  const { context, emit } = transformComposableProps(props)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
      getRootNode,
      onChange(details) {
        emit('change', details)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UsePaginationReturn = UnwrapRef<ReturnType<typeof usePagination>>
