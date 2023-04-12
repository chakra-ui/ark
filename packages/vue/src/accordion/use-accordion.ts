import { connect, machine, type Context as AccordionContext } from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, onMounted, reactive, watch } from 'vue'
import { useId } from '../utils'

export interface UseAccordionContext extends Omit<AccordionContext, 'id' | 'value'> {
  modelValue?: AccordionContext['value']
}

export type UseAccordionDefaultValue = AccordionContext['value']

export const useAccordion = (
  emit: CallableFunction,
  context: UseAccordionContext,
  defaultValue?: UseAccordionDefaultValue,
) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...context,
      value: defaultValue,
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

  onMounted(() => {
    // Init modelValue with `defaultValue`.
    // This is mostly relevant in case modelValue is empty but defaultValue is set.
    emit('update:modelValue', Array.isArray(defaultValue) ? Array.from(defaultValue) : defaultValue)
  })

  watch(
    () => reactiveContext.modelValue,
    (value, prevValue) => {
      if (value === prevValue) return
      api.value.setValue(value as string | string[])
    },
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return { api }
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>
