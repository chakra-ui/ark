import * as menu from '@zag-js/menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './menu'

export interface UseMenuProps
  extends Optional<Omit<menu.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the menu when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: menu.Context['open']
}

export interface UseMenuReturn {
  api: ComputedRef<menu.Api<PropTypes>>
  machine: menu.Service
}

export const useMenu = (props: UseMenuProps, emit?: EmitFn<RootEmits>): UseMenuReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<menu.Context>(() => ({
    id,
    dir: locale.value.dir,
    open: props.open ?? props.defaultOpen,
    'open.controlled': props.open !== undefined,
    getRootNode: env?.value.getRootNode,
    onOpenChange: (details) => {
      emit?.('openChange', details)
      emit?.('update:open', details.open)
    },
    onEscapeKeyDown: (details) => emit?.('escapeKeyDown', details),
    onFocusOutside: (details) => emit?.('focusOutside', details),
    onHighlightChange: (details) => emit?.('highlightChange', details),
    onInteractOutside: (details) => emit?.('interactOutside', details),
    onPointerDownOutside: (details) => emit?.('pointerDownOutside', details),
    onSelect: (details) => emit?.('select', details),
    ...cleanProps(props),
  }))

  const [state, send, machine] = useMachine(menu.machine(context.value), { context })
  const api = computed(() => menu.connect(state.value, send, normalizeProps))

  return {
    api,
    machine,
  }
}
