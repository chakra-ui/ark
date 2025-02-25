import * as steps from '@zag-js/steps'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './steps.types'

export interface UseStepsProps extends Optional<Omit<steps.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The v-model value of the step
   */
  modelValue?: number
}

export interface UseStepsReturn extends ComputedRef<steps.Api<PropTypes>> {}

export function useSteps(props: UseStepsProps = {}, emit?: EmitFn<RootEmits>): UseStepsReturn {
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const id = useId()

  const context = computed<steps.Props>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value?.getRootNode,
    value: props.modelValue,
    onStepChange: (details) => {
      emit?.('stepChange', details)
      emit?.('update:modelValue', details.step)
    },
    onStepComplete: () => emit?.('stepComplete'),
    ...cleanProps(props),
  }))

  const service = useMachine(steps.machine, context)
  return computed(() => steps.connect(service, normalizeProps))
}
