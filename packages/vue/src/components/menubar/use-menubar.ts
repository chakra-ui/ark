import * as menubar from '@zag-js/menubar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { Optional } from '../../types.ts'
import { cleanProps } from '../../utils/clean-props.ts'

export interface UseMenubarProps extends Optional<Omit<menubar.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseMenubarReturn extends ComputedRef<menubar.Api<PropTypes>> {}

export const useMenubar = (props: MaybeRef<UseMenubarProps> = {}): UseMenubarReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<menubar.Props>(() => {
    const localeProps = toValue<UseMenubarProps>(props)
    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
    }
  })

  const service = useMachine(menubar.machine, context)
  return computed(() => menubar.connect(service, normalizeProps))
}
