import { connect, Context, machine } from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { transformComposableProps, useId } from '../utils'

type UseMenuPropsContext = Optional<Context, 'id'>

export type UseMenuProps = {
  context: UseMenuPropsContext
  emit: CallableFunction
}

export const useMenu = (props: UseMenuProps) => {
  const { emit, context } = transformComposableProps(props)

  const getRootNode = useEnvironmentContext()

  const [state, send, menuMachine] = useMachine(
    machine({
      ...context,
      id: useId().value,
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
