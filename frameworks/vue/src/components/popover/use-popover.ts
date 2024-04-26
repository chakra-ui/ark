import * as popover from '@zag-js/popover'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './popover.types'

export interface UsePopoverProps
  extends Optional<Omit<popover.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the popover when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: popover.Context['open']
}

export interface UsePopoverReturn extends ComputedRef<popover.Api<PropTypes>> {}

export const usePopover = (props: UsePopoverProps, emit: EmitFn<RootEmits>) => {
  const env = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    popover.machine({
      ...context.value,
      id: context.value.id || useId().value,
      open: props.open ?? props.defaultOpen,
      'open.controlled': props.open !== undefined,
      getRootNode: env?.value.getRootNode,
      onOpenChange: (details) => {
        emit('openChange', details)
        emit('update:open', details.open)
      },
      onEscapeKeyDown: (details) => emit('escapeKeyDown', details),
      onFocusOutside: (details) => emit('focusOutside', details),
      onInteractOutside: (details) => emit('interactOutside', details),
      onPointerDownOutside: (details) => emit('pointerDownOutside', details),
    }),
    { context },
  )

  return computed(() => popover.connect(state.value, send, normalizeProps))
}
