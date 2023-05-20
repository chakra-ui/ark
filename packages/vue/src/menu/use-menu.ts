import { connect, machine } from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { MenuProps } from './menu'

export const useMenu = <T extends ExtractPropTypes<MenuProps>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send, menuMachine] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
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
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return { api, menuMachine }
}

export type UseMenuReturn = {
  api: UnwrapRef<ReturnType<typeof useMenu>['api']>
  menuMachine: ReturnType<typeof useMenu>['menuMachine']
}
