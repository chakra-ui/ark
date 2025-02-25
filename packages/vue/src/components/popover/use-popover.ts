import * as popover from '@zag-js/popover'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './popover.types'

export interface UsePopoverProps extends Optional<Omit<popover.Props, 'dir' | 'getRootNode' | 'open'>, 'id'> {
  /**
   * The v-model open state of the popover
   */
  modelValue?: popover.Props['open']
}
export interface UsePopoverReturn extends ComputedRef<popover.Api<PropTypes>> {}

export const usePopover = (props: UsePopoverProps = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<popover.Props>(() => ({
    id,
    dir: locale.value.dir,
    open: props.modelValue,
    getRootNode: env?.value.getRootNode,
    onOpenChange: (details) => {
      emit?.('openChange', details)
      emit?.('update:open', details.open) // TODO: remove this
      emit?.('update:modelValue', details.open)
    },
    onEscapeKeyDown: (details) => emit?.('escapeKeyDown', details),
    onFocusOutside: (details) => emit?.('focusOutside', details),
    onInteractOutside: (details) => emit?.('interactOutside', details),
    onPointerDownOutside: (details) => emit?.('pointerDownOutside', details),
    ...cleanProps(props),
  }))

  const service = useMachine(popover.machine, context)
  return computed(() => popover.connect(service, normalizeProps))
}
