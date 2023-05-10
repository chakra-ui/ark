import { connect, machine, type Context as AccordionContext } from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch } from 'vue'
import { useId } from '../utils'

export interface UseAccordionContext extends Omit<AccordionContext, 'id'> {
  modelValue?: AccordionContext['value']
}

export const useAccordion = (emit: CallableFunction, context: UseAccordionContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      id: useId().value,
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

export type UseAccordionReturn = ReturnType<typeof useAccordion>
