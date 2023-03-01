import { connect, Context, machine } from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed } from 'vue'
import { transformComposableProps, useId } from '../utils'

export type UseDialogProps = {
  context: Omit<Context, 'id'>
  emit: CallableFunction
}

export const useDialog = (props: UseDialogProps) => {
  const { context, emit } = transformComposableProps(props)

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
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
