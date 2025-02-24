import * as menu from '@zag-js/menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './menu'

export interface UseMenuProps extends Optional<Omit<menu.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseMenuReturn {
  api: ComputedRef<menu.Api<PropTypes>>
  machine: menu.Service
}

export const useMenu = (props: UseMenuProps = {}, emit?: EmitFn<RootEmits>): UseMenuReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<menu.Props>(() => ({
    id,
    dir: locale.value.dir,

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

  const machine = useMachine(menu.machine, context)
  const api = computed(() => menu.connect(machine, normalizeProps))

  return {
    api,
    machine,
  }
}
