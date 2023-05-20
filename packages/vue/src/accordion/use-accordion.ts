import { connect, machine } from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { AccordionContext } from './accordion'

export const useAccordion = <T extends ExtractPropTypes<AccordionContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      id: reactiveContext.id || useId().value,
      getRootNode,
      onChange: (details) => {
        emit('change', details.value)
        emit(
          'update:modelValue',
          Array.isArray(details.value) ? Array.from(details.value) : details.value,
        )
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.modelValue,
    (value, prevValue) => {
      if (value === prevValue) return
      api.value.setValue(value as string | string[])
    },
  )

  return { api }
}
