import { connect, machine } from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { PopoverContext } from './popover'

export const usePopover = <T extends ExtractPropTypes<PopoverContext>>(
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

export type UsePopoverReturn = ReturnType<typeof connect>
