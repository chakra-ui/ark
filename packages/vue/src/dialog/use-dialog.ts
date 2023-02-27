import { connect, Context, machine } from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

export type UseDialogProps = {
  context: Omit<Context, 'id'>
  emit: CallableFunction
}

export const useDialog = (props: UseDialogProps) => {
  const emit = props.emit
  const reactiveContext = reactive(props.context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
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
