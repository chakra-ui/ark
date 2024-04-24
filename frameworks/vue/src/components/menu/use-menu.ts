import * as menu from '@zag-js/menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils'

export interface UseMenuProps extends Omit<Optional<menu.Context, 'id'>, 'open.controlled'> {}

export interface UseMenuReturn {
  api: ComputedRef<menu.Api<PropTypes>>
  machine: menu.Service
}

export const useMenu = (props: UseMenuProps, emit: CallableFunction): UseMenuReturn => {
  const context = ref(props)
  const getRootNode = useEnvironmentContext()

  const [state, send, machine] = useMachine(
    menu.machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode,
      'open.controlled': props.open !== undefined,
      onOpenChange: (details) => {
        emit('open-change', details)
      },
      onSelect: (details) => {
        emit('select', details)
      },
    }),
    { context },
  )

  const api = computed(() => menu.connect(state.value, send, normalizeProps))

  return {
    api,
    machine,
  }
}
