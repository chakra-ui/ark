import { connect, machine, type Context } from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch } from 'vue'
import { useId } from '../utils'

export type UseDialogContext = Omit<Context, 'id'>

export const useDialog = (emit: CallableFunction, context: UseDialogContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      onOpen() {
        emit('open')
        emit('update:open', true)
      },
      onClose() {
        emit('close')
        emit('update:open', false)
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

  watch(
    () => reactiveContext.open,
    (value) => {
      if (value == undefined) return
      if (value) {
        api.value.open()
      } else {
        api.value.close()
      }
    },
  )

  return api
}

export type UseDialogReturn = ReturnType<typeof useDialog>
