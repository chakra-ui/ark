import * as popover from '@zag-js/popover'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './popover.types'

export interface UsePopoverProps extends Optional<Omit<popover.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePopoverReturn extends ComputedRef<popover.Api<PropTypes>> {}

export const usePopover = (props: UsePopoverProps = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<popover.Props>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
    onOpenChange: (details) => {
      emit?.('openChange', details)
      emit?.('update:open', details.open)
      props.onOpenChange?.(details)
    },
    onEscapeKeyDown: (details) => {
      emit?.('escapeKeyDown', details)
      props.onEscapeKeyDown?.(details)
    },
    onFocusOutside: (details) => {
      emit?.('focusOutside', details)
      props.onFocusOutside?.(details)
    },
    onInteractOutside: (details) => {
      emit?.('interactOutside', details)
      props.onInteractOutside?.(details)
    },
    onPointerDownOutside: (details) => {
      emit?.('pointerDownOutside', details)
      props.onPointerDownOutside?.(details)
    },
  }))

  const service = useMachine(popover.machine, context)
  return computed(() => popover.connect(service, normalizeProps))
}
