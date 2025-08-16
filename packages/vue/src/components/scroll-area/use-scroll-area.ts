import * as scrollArea from '@zag-js/scroll-area'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { cleanProps } from '../../utils'

export interface UseScrollAreaProps extends Optional<Omit<scrollArea.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseScrollAreaReturn extends ComputedRef<scrollArea.Api<PropTypes>> {}

export const useScrollArea = (props: MaybeRef<UseScrollAreaProps> = {}): UseScrollAreaReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<scrollArea.Props>(() => {
    const localProps = toValue<UseScrollAreaProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
    }
  })

  const service = useMachine(scrollArea.machine, context)
  return computed(() => scrollArea.connect(service, normalizeProps))
}
