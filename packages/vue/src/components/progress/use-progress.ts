import * as progress from '@zag-js/progress'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './progress.types'

export interface UseProgressProps extends Optional<Omit<progress.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * Use this prop to control the value of the progress.
   */
  modelValue?: progress.Props['value']
}
export interface UseProgressReturn extends ComputedRef<progress.Api<PropTypes>> {}

export const useProgress = (props: UseProgressProps = {}, emit?: EmitFn<RootEmits>): UseProgressReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<progress.Props>(() => ({
    id,
    dir: locale.value.dir,
    value: props.modelValue,
    getRootNode: env?.value.getRootNode,
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    ...cleanProps(props),
  }))

  const service = useMachine(progress.machine, context)
  return computed(() => progress.connect(service, normalizeProps))
}
