import * as dialog from '@zag-js/dialog'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './dialog'

export interface UseDialogProps extends Optional<Omit<dialog.Props, 'dir' | 'getRootNode' | 'open'>, 'id'> {
  /**
   * The v-model open state of the dialog
   */
  modelValue?: dialog.Props['open']
}
export interface UseDialogReturn extends ComputedRef<dialog.Api<PropTypes>> {}

export const useDialog = (props: UseDialogProps = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<dialog.Props>(() => ({
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

  const service = useMachine(dialog.machine, context)
  return computed(() => dialog.connect(service, normalizeProps))
}
