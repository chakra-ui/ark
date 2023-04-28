import { connect, machine, type Context as SelectContext } from '@zag-js/select'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'

export interface UseSelectContext extends Omit<SelectContext, 'id'> {
  modelValue?: SelectContext['selectedOption']
}

export const useSelect = (emit: CallableFunction, context: UseSelectContext) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      getRootNode,
      selectedOption: reactiveContext.modelValue ?? reactiveContext.selectedOption,
      onChange: (details) => {
        emit('change', { ...details })
        emit('update:modelValue', { ...details })
      },
      onHighlight(details) {
        emit('highlight', { ...details })
      },
      onClose() {
        emit('close')
      },
      onOpen() {
        emit('open')
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UseSelectReturn = ReturnType<typeof useSelect>
