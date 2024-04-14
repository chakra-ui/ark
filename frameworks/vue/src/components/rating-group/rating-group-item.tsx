import type { ItemProps } from '@zag-js/rating-group'
import { type PropType, computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { useRatingGroupContext } from './rating-group-context'
import { RatingGroupItemProvider } from './rating-group-item-context'

export interface RatingGroupItemProps extends Assign<HTMLArkProps<'span'>, ItemProps> {}

export const RatingGroupItem = defineComponent<RatingGroupItemProps>(
  (props, { slots, attrs }) => {
    const api = useRatingGroupContext()
    const itemState = computed(() => api.value.getItemState(props))
    RatingGroupItemProvider(computed(() => props))

    return () => (
      <ark.span {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(itemState.value)}
      </ark.span>
    )
  },
  {
    name: 'RatingGroupItem',
    props: {
      index: {
        type: Number as PropType<ItemProps['index']>,
        required: true,
      },
    },
  },
)
