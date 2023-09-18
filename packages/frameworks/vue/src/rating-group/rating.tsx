import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { RatingProvider } from './rating-context'
import { useRatingGroupContext } from './rating-group-context'

export type RatingProps = HTMLArkProps<'span'> & {
  index: number
}

export const Rating: ComponentWithProps<RatingProps> = defineComponent({
  name: 'Rating',
  props: {
    index: {
      type: Number as PropType<RatingProps['index']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useRatingGroupContext()

    const ratingState = computed(() => api.value.getRatingState({ index: props.index }))

    RatingProvider(ratingState)

    return () => (
      <ark.span {...api.value.getRatingProps({ index: props.index })} {...attrs}>
        {slots.default?.({ ...ratingState.value })}
      </ark.span>
    )
  },
})
