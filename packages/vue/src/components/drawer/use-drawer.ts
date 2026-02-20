import * as drawer from '@zag-js/drawer'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RootEmits } from './drawer.types'
import { useDrawerStackStore } from './use-drawer-stack-store'

export interface UseDrawerProps extends Optional<Omit<drawer.Props, 'dir' | 'getRootNode' | 'defaultSnapPoint'>, 'id'> {
  defaultSnapPoint?: drawer.SnapPoint | undefined
}
export interface UseDrawerReturn extends ComputedRef<drawer.Api<PropTypes>> {}

export const useDrawer = (props: MaybeRef<UseDrawerProps> = {}, emit?: EmitFn<RootEmits>): UseDrawerReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const stack = useDrawerStackStore()

  const context = computed<drawer.Props>(() => {
    const localeProps = toValue<UseDrawerProps>(props)
    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      stack,
      ...cleanProps(localeProps),
      onOpenChange: (details) => {
        emit?.('openChange', details)
        localeProps.onOpenChange?.(details)
      },
      onSnapPointChange: (details) => {
        emit?.('snapPointChange', details)
        localeProps.onSnapPointChange?.(details)
      },
    }
  })

  const service = useMachine(drawer.machine, context as any)
  return computed(() => drawer.connect(service, normalizeProps))
}
