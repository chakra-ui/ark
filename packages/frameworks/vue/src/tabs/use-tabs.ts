import * as tabs from '@zag-js/tabs'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseTabsProps = Optional<tabs.Context, 'id'> & {
  modelValue?: tabs.Context['value']
}
export type UseTabsReturn = ComputedRef<tabs.Api<PropTypes>>

export const useTabs = (props: UseTabsProps, emit: CallableFunction): UseTabsReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    tabs.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onFocusChange: (details) => emit('focus-change', details),
      onValueChange: (details) => {
        emit('value-change', details.value)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => tabs.connect(state.value, send, normalizeProps))
}
