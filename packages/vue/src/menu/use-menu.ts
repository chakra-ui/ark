import { connect, machine, type Context } from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, ref, type ExtractPropTypes, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseMenuContext = Optional<Context, 'id'>

export const useMenu = <T extends ExtractPropTypes<UseMenuContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const machineContext = ref(context)

  const getRootNode = useEnvironmentContext()

  const [state, send, menuMachine] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
      getRootNode,
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
    { context: machineContext },
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return { api, menuMachine }
}

export type UseMenuReturn = {
  api: UnwrapRef<ReturnType<typeof useMenu>['api']>
  menuMachine: ReturnType<typeof useMenu>['menuMachine']
}
