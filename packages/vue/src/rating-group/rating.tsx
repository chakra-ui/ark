import { computed, defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
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

    const ratingState = computed(() => api.value.getRatingState(props.index))

    RatingProvider(ratingState)

    return () => (
      <ark.span {...api.value.getRatingProps({ index: props.index })} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.span>
    )
  },
})
