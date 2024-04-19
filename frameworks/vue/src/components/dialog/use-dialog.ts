import * as dialog from '@zag-js/dialog'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils'

export interface UseDialogProps extends Omit<Optional<dialog.Context, 'id'>, 'open.controlled'> {
  /**
   * The initial open state of the dialog.
   */
  defaultOpen?: dialog.Context['open']
  'onUpdate:open'?: (open: dialog.OpenChangeDetails['open']) => void
}

export interface UseDialogReturn extends ComputedRef<dialog.dialog<PropTypes>> {}

export const useDialog = (props: UseDialogProps, emit: CallableFunction) => {
  const context = ref(props)
  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    dialog.machine({
      ...context.value,
      id: context.value.id || useId().value,
      open: props.open ?? props.defaultOpen,
      getRootNode,
      'open.controlled': props.open !== undefined,
      onOpenChange: (details) => {
        emit('open-change', details)
        emit('update:open', details.open)
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
