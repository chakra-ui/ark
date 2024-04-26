import * as menu from '@zag-js/menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './menu'

export interface UseMenuProps
  extends Optional<Omit<menu.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {}

export interface UseMenuReturn {
  api: ComputedRef<menu.Api<PropTypes>>
  machine: menu.Service
}

export const useMenu = (props: UseMenuProps, emit: EmitFn<RootEmits>): UseMenuReturn => {
  const context = ref(props)
  const env = useEnvironmentContext()

  const [state, send, machine] = useMachine(
    menu.machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode: env?.value.getRootNode,
      'open.controlled': props.open !== undefined,
      onOpenChange: (details) => {
        emit('openChange', details)
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
