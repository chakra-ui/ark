import { connect, machine, type Context } from '@zag-js/dialog'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, ref, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseDialogProps = Optional<Context, 'id'>

export const useDialog = <T extends ExtractPropTypes<UseDialogProps>>(
  emit: CallableFunction,
  context: T,
) => {
  const machineContext = ref(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
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
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseDialogReturn = ReturnType<typeof useDialog>
