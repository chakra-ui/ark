import * as popover from '@zag-js/popover'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './popover.types'

export interface UsePopoverProps extends Optional<Omit<popover.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePopoverReturn extends ComputedRef<popover.Api<PropTypes>> {}

export const usePopover = (props: MaybeRef<UsePopoverProps> = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<popover.Props>(() => {
    const localeProps = toValue<UsePopoverProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
        localeProps.onOpenChange?.(details)
      },
      onEscapeKeyDown: (details) => {
        emit?.('escapeKeyDown', details)
        localeProps.onEscapeKeyDown?.(details)
      },
      onFocusOutside: (details) => {
        emit?.('focusOutside', details)
        localeProps.onFocusOutside?.(details)
      },
      onInteractOutside: (details) => {
        emit?.('interactOutside', details)
        localeProps.onInteractOutside?.(details)
      },
      onPointerDownOutside: (details) => {
        emit?.('pointerDownOutside', details)
        localeProps.onPointerDownOutside?.(details)
      },
    }
  })

  const service = useMachine(popover.machine, context)
  return computed(() => popover.connect(service, normalizeProps))
}
