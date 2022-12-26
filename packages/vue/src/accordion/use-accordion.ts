import { connect, machine, type Context as AccordionContext } from '@zag-js/accordion'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, getCurrentInstance, onMounted, reactive, watch } from 'vue'

interface AccordionProps extends AccordionContext {
  modelValue?: string | string[]
}
export const useAccordion = (
  context: Omit<AccordionProps, 'id'>,
  emit: CallableFunction,
  defaultValue?: string | string[],
) => {
  const reactiveContext = reactive(context)
  const instance = getCurrentInstance()
  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      value: defaultValue,
      id: instance?.uid.toString() as string,
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
