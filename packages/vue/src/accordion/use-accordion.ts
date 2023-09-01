import * as accordion from '@zag-js/accordion'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseAccordionProps = Optional<accordion.Context, 'id'> & {
  modelValue?: accordion.Context['value']
}
export type UseAccordionReturn = ComputedRef<accordion.Api<PropTypes>>

export const useAccordion = (
  props: UseAccordionProps,
  emit: CallableFunction,
): UseAccordionReturn => {
  const getRootNode = useEnvironmentContext()

  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    accordion.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onChange: (details) => {
        emit('change', details.value)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => accordion.connect(state.value, send, normalizeProps))
}
