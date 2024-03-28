import * as popover from '@zag-js/popover'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UsePopoverProps extends Omit<Optional<popover.Context, 'id'>, 'open.controlled'> {
  /**
   * The initial open state of the popover.
   */
  defaultOpen?: popover.Context['open']
  'onUpdate:open'?: (open: popover.OpenChangeDetails['open']) => void
}

export interface UsePopoverReturn extends ComputedRef<popover.Api<PropTypes>> {}

export const usePopover = (props: UsePopoverProps, emit: CallableFunction) => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    popover.machine({
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

  return computed(() => popover.connect(state.value, send, normalizeProps))
}
