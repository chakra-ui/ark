import { raf } from '@zag-js/dom-query'
import * as popover from '@zag-js/popover'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId, watch } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { EmitFn, Optional } from '../../types.ts'
import { cleanProps } from '../../utils/clean-props.ts'
import type { RootEmits } from './popover.types.ts'

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
      onTriggerValueChange: (details) => {
        emit?.('triggerValueChange', details)
        emit?.('update:triggerValue', details.value)
        localeProps.onTriggerValueChange?.(details)
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
      onRequestDismiss: (details) => {
        emit?.('requestDismiss', details)
        localeProps.onRequestDismiss?.(details)
      },
    }
  })

  const service = useMachine(popover.machine, context)
  const api = computed(() => popover.connect(service, normalizeProps))

  watch(
    () => api.value.open,
    (open, _, onCleanup) => {
      if (!open) return
      const titleId = api.value.getTitleProps().id
      const descriptionId = api.value.getDescriptionProps().id
      onCleanup(
        raf(() => {
          service.context.set('renderedElements', {
            title: !!(titleId && service.scope.getById(titleId)),
            description: !!(descriptionId && service.scope.getById(descriptionId)),
          })
        }),
      )
    },
    { flush: 'post' },
  )

  return api
}
