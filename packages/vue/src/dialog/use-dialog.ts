import { connect, machine, type Context } from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'

export type UseDialogContext = Omit<Context, 'id'>

export const useDialog = (emit: CallableFunction, context: UseDialogContext) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      getRootNode,
      onClose() {
        emit('close')
      },
      onEsc() {
        emit('esc')
      },
      onOutsideClick() {
        emit('outsideClick')
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UseDialogReturn = ReturnType<typeof useDialog>
