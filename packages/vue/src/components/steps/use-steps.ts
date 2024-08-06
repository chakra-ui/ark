import * as steps from '@zag-js/steps'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './steps.types'

export interface UseStepsProps extends Optional<Omit<steps.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the step
   */
  defaultStep?: number
}

export interface UseStepsReturn extends ComputedRef<steps.Api<PropTypes>> {}

export function useSteps(props: UseStepsProps = {}, emit?: EmitFn<RootEmits>): UseStepsReturn {
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const id = useId()

  const context = computed<steps.Context>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value?.getRootNode,
    step: props.step ?? props.defaultStep,
    onStepChange: (details) => emit?.('stepChange', details),
    onStepComplete: () => emit?.('stepComplete'),
    ...props,
  }))

  const [state, send] = useMachine(steps.machine(context.value), { context })

  return computed(() => steps.connect(state.value, send, normalizeProps))
}
