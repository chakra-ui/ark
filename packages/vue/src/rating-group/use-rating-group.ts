import { connect, Context as RatingGroupContext, machine } from '@zag-js/rating-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

type RatingGroupPropsContext = Omit<RatingGroupContext, 'id'> & {
  modelValue?: RatingGroupContext['value']
}

export type UseRatingGroupProps = {
  context: RatingGroupPropsContext
  emit: CallableFunction
}

export const useRatingGroup = (props: UseRatingGroupProps) => {
  const reactiveProps = reactive(props)
  const { context, emit } = reactiveProps
  const reactiveContext = reactive(context)
  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      value: context.modelValue,
      onChange(details) {
        emit('change', details.value)
        emit('update:modelValue', details.value)
      },
      onHover(details) {
        emit('hover', details)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UseRatingGroupReturn = ReturnType<typeof useRatingGroup>
