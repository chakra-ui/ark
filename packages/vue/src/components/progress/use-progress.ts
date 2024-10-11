import * as progress from '@zag-js/progress'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { cleanProps } from '../../utils'

export interface UseProgressProps
  extends Optional<Omit<progress.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseProgressReturn extends ComputedRef<progress.Api<PropTypes>> {}

export const useProgress = (props: UseProgressProps): UseProgressReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<progress.Context>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(progress.machine(context.value), { context })

  return computed(() => progress.connect(state.value, send, normalizeProps))
}
