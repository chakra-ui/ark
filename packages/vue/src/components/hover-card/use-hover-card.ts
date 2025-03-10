import * as hoverCard from '@zag-js/hover-card'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './hover-card.types'

export interface UseHoverCardProps extends Optional<Omit<hoverCard.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseHoverCardReturn extends ComputedRef<hoverCard.Api<PropTypes>> {}

export const useHoverCard = (props: MaybeRef<UseHoverCardProps> = {}, emit?: EmitFn<RootEmits>): UseHoverCardReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<hoverCard.Props>(() => {
    const localeProps = toValue<UseHoverCardProps>(props)

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

  const service = useMachine(hoverCard.machine, context)
  return computed(() => hoverCard.connect(service, normalizeProps))
}
