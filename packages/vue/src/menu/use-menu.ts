import { connect, machine, type Context } from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type UnwrapRef } from 'vue'
import { type Optional } from '../types'
import { useId } from '../utils'

export type UseMenuContext = Optional<Context, 'id'>

export const useMenu = (emit: CallableFunction, context: UseMenuContext) => {
  const reactiveContext = reactive(context)

  const [state, send, menuMachine] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      onOpen() {
        emit('open')
      },
      onClose() {
        emit('close')
      },
      onSelect(details) {
        emit('select', details)
      },
      onValueChange(details) {
        emit('value-change', details)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return { api, menuMachine }
}

export type UseMenuReturn = {
  api: UnwrapRef<ReturnType<typeof useMenu>['api']>
  menuMachine: ReturnType<typeof useMenu>['menuMachine']
}
