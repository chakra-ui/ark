import * as dialog from '@zag-js/dialog'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseDialogProps extends Optional<dialog.Context, 'id'> {
  modelValue?: dialog.Context['open']
}

export interface UseDialogReturn extends ComputedRef<dialog.Api<PropTypes>> {}

export const useDialog = (props: UseDialogProps, emit: CallableFunction) => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    dialog.machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode,
      onOpenChange: (details) => {
        emit('open-change', details)
        emit('update:modelValue', details.open)
      },
      onEscapeKeyDown: (details) => {
        emit('escape-key-down', details)
      },
      onFocusOutside: (details) => {
        emit('focus-outside', details)
      },
      onInteractOutside: (details) => {
        emit('interact-outside', details)
      },
      onPointerDownOutside: (details) => {
        emit('pointer-down-outside', details)
      },
    }),
    { context },
  )

  return computed(() => dialog.connect(state.value, send, normalizeProps))
}
