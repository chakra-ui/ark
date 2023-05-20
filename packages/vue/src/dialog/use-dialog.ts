import { connect, machine } from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { DialogProps } from './dialog'

export const useDialog = <T extends ExtractPropTypes<DialogProps>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      getRootNode,
      onClose() {
        emit('close')
        emit('update:open', false)
      },
      onEsc() {
        emit('esc')
      },
      onOutsideClick() {
        emit('outside-click')
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

export type UseDialogReturn = ReturnType<typeof connect>
