import * as dialog from '@zag-js/dialog'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './dialog'

export interface UseDialogProps extends Optional<Omit<dialog.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseDialogReturn extends ComputedRef<dialog.Api<PropTypes>> {}

export const useDialog = (props: MaybeRef<UseDialogProps> = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<dialog.Props>(() => {
    const localeProps = toValue<UseDialogProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(props),
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

  const service = useMachine(dialog.machine, context)
  return computed(() => dialog.connect(service, normalizeProps))
}
