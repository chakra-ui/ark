import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, reactive, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseCarouselContext = Optional<menu.Context, 'id'>

export type UseMenuReturn = {
  api: ComputedRef<menu.Api<PropTypes>>
  menuMachine: ReturnType<typeof menu.machine>
}

export const useMenu = (emit: CallableFunction, context: UseCarouselContext): UseMenuReturn => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send, menuMachine] = useMachine(
    menu.machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      getRootNode,
      onOpenChange() {
        emit('open-change')
      },
      onSelect() {
        emit('select')
      },
      onValueChange() {
        emit('value-change')
        emit('update:modelValue')
      },
    }),
  )
  const api = computed(() => menu.connect(state.value, send, normalizeProps))

  return {
    api,
    menuMachine,
  }
}
