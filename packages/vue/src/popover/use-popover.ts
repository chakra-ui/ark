import { connect, machine, type Context as PopoverContext } from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, watch, type UnwrapRef } from 'vue'
import { type Optional } from '../types'
import { transformComposableProps, useId } from '../utils'

interface UsePopoverPropsContext extends Optional<PopoverContext, 'id'> {
  /**
   * Control the open state of the popover.
   *
   * @default false
   */
  isOpen?: boolean
}

export type UsePopoverProps = {
  context: UsePopoverPropsContext
  emit: CallableFunction
}

export const usePopover = (props: UsePopoverProps) => {
  const { context, emit } = transformComposableProps(props)

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
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
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => context.isOpen,
    (curr) => {
      if (curr == null) return

      if (curr && !state.value.matches('open')) {
        api.value.open()
        return
      } else if (!curr && !state.value.matches('closed')) {
        api.value.close()
        return
      }
    },
  )

  return api
}

export type UsePopoverReturn = UnwrapRef<ReturnType<typeof usePopover>>
