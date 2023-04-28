import { connect, machine, type Context as PopoverContext } from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useId } from '../utils'

export interface UsePopoverContext extends Optional<PopoverContext, 'id'> {
  /**
   * Control the open state of the popover.
   *
   * @default false
   */
  isOpen?: boolean
}

export const usePopover = (emit: CallableFunction, context: UsePopoverContext) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      getRootNode,
      open: reactiveContext.isOpen,
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
    () => reactiveContext.isOpen,
    (curr, prev) => {
      if (curr == null || curr === prev) return

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
