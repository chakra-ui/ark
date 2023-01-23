import { connect, Context as RatingGroupContext, machine } from '@zag-js/rating-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, getCurrentInstance, onMounted, reactive } from 'vue'

type RatingGroupPropsContext = Omit<RatingGroupContext, 'id'> & {
  modelValue?: RatingGroupContext['value']
}

export type UseRatingGroupProps = {
  context: RatingGroupPropsContext
  emit: CallableFunction
  defaultValue?: RatingGroupContext['value']
}

export const useRatingGroup = (props: UseRatingGroupProps) => {
  const reactiveProps = reactive(props)
  const { context, emit, defaultValue } = reactiveProps
  const reactiveContext = reactive(context)
  const instance = getCurrentInstance()
  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: instance?.uid.toString() as string,
      value: defaultValue,
      onChange(details) {
        emit('change', details.value)
        emit('update:modelValue', details.value)
      },
      onHover(details) {
        emit('hover', details)
      },
    }),
  )

  onMounted(() => {
    // Init modelValue with `defaultValue`.
    // This is mostly relevant in case modelValue is empty but defaultValue is set.
    emit('update:modelValue', defaultValue)
  })

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UseRatingGroupReturn = ReturnType<typeof useRatingGroup>
