import { connect, machine, type Context } from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UsePopoverContext = Optional<Context, 'id'> & {
  /**
   * Control the open state of the popover.
   *
   * @default false
   */
  isOpen?: boolean
}

export const usePopover = <T extends ExtractPropTypes<UsePopoverContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const machineContext = computed(() => ({
    ...context,
    open: context.isOpen,
  }))

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
      getRootNode,
      onEscapeKeyDown(event) {
        emit('escape-key-down', event)
      },
      onFocusOutside(event) {
        emit('focus-outside', event)
      },
      onInteractOutside(event) {
        emit('interact-outside', event)
      },
      onOpen() {
        emit('open')
      },
      onClose() {
        emit('close')
      },
      onPointerDownOutside(event) {
        emit('pointer-down-outside', event)
      },
    }),
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
