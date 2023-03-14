import { connect, machine, type Context as AccordionContext } from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, onMounted, watch } from 'vue'
import { useEnvironmentContext } from '../environment'
import { transformComposableProps, useId } from '../utils'

interface AccordionProps extends Omit<AccordionContext, 'id' | 'value'> {
  modelValue?: AccordionContext['value']
}

export interface UseAccordionProps {
  context: Omit<AccordionProps, 'id'>
  emit: CallableFunction
  defaultValue?: AccordionContext['value']
}

export const useAccordion = (props: UseAccordionProps) => {
  const { context, emit, defaultValue } = transformComposableProps(props)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...context,
      value: defaultValue,
      id: useId().value,
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

  onMounted(() => {
    // Init modelValue with `defaultValue`.
    // This is mostly relevant in case modelValue is empty but defaultValue is set.
    emit('update:modelValue', Array.isArray(defaultValue) ? Array.from(defaultValue) : defaultValue)
  })

  watch(
    () => context.modelValue,
    (value, prevValue) => {
      if (value === prevValue) return
      api.value.setValue(value as string | string[])
    },
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return { api }
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>
