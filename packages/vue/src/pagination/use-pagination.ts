import { connect, Context as PaginationContext, machine } from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, UnwrapRef } from 'vue'
import type { Optional } from '../types'
import { transformComposableProps, useId } from '../utils'

type UsePaginationPropsContext = Optional<PaginationContext, 'id'>

export type UsePaginationProps = {
  context: UsePaginationPropsContext
  emit: CallableFunction
}

export const usePagination = (props: UsePaginationProps) => {
  const { context, emit } = transformComposableProps(props)

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
      onChange(details) {
        emit('change', details)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UsePaginationReturn = UnwrapRef<ReturnType<typeof usePagination>>
