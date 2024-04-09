import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, watch, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseMenuProps extends Omit<Optional<menu.Context, 'id'>, 'open.controlled'> {}

export interface UseMenuReturn {
  api: ComputedRef<menu.Api<PropTypes>>
  machine: ReturnType<typeof menu.machine>
}

export const useMenu = (props: UseMenuProps, emit: CallableFunction): UseMenuReturn => {
  const context = computed(() => {
    return {
      ...props,
      'open.controlled': props.open !== undefined,
    }
  })
  const getRootNode = useEnvironmentContext()

  const [state, send, machine] = useMachine(
    menu.machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode,
      onOpenChange: (details) => {
        emit('open-change', details)
      },
      onSelect: (details) => {
        emit('select', details)
      },
    }),
  )

  watch(
    () => context.value.open,
    (value) => {
      if (value === undefined) return
      if (value) {
        api.value.open()
      } else {
        api.value.close()
      }
    },
  )

  const api = computed(() => menu.connect(state.value, send, normalizeProps))

  return {
    api,
    machine,
  }
}
