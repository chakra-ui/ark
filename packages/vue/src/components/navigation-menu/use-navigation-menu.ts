import * as navigationMenu from '@zag-js/navigation-menu'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RootEmits } from './navigation-menu.types'

export interface UseNavigationMenuProps extends Optional<Omit<navigationMenu.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseNavigationMenuReturn extends ComputedRef<navigationMenu.Api<PropTypes>> {}

export const useNavigationMenu = (
  props: MaybeRef<UseNavigationMenuProps> = {},
  emit?: EmitFn<RootEmits>,
): UseNavigationMenuReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<navigationMenu.Props>(() => {
    const localProps = toValue<UseNavigationMenuProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:value', details.value)
        localProps.onValueChange?.(details)
      },
    }
  })

  const service = useMachine(navigationMenu.machine, context)
  return computed(() => navigationMenu.connect(service, normalizeProps))
}
