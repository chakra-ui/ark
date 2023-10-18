import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useRatingGroupContext } from './rating-group-context'
import { RatingGroupItemProvider } from './rating-group-item-context'

export type RatingGroupItemProps = HTMLArkProps<'span'> & {
  index: number
}

export const RatingGroupItem: ComponentWithProps<RatingGroupItemProps> = defineComponent({
  name: 'Rating',
  props: {
    index: {
      type: Number as PropType<RatingGroupItemProps['index']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useRatingGroupContext()
    const itemState = computed(() => api.value.getItemState(props))
    RatingGroupItemProvider(itemState)

    return () => (
      <>
        <ark.span {...api.value.getItemProps(props)} {...attrs}>
          {slots.default?.(itemState.value)}
        </ark.span>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
})
