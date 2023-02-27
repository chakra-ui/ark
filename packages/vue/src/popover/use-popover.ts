import { connect, Context as PopoverContext, machine } from '@zag-js/popover'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, UnwrapRef, watch } from 'vue'
import type { Optional } from '../types'
import { useId } from '../utils'

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
  const emit = props.emit
  const reactiveContext = reactive(props.context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      defaultOpen: props.context.isOpen,
      onEscapeKeyDown(event) {
        emit('escape-key-down', event)
      },
      onFocusOutside(event) {
        emit('focus-outside', event)
      },
      onInteractOutside(event) {
        emit('interact-outside', event)
      },
      onOpenChange(open) {
        emit('open-change', open)
      },
      onPointerDownOutside(event) {
        emit('pointer-down-outside', event)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.isOpen,
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
