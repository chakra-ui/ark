import type { ItemProps } from '@zag-js/rating-group'
import { type PropType, computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'
import { RatingGroupItemProvider } from './use-rating-group-item-context'

export interface RatingGroupItemProps extends Assign<HTMLArkProps<'span'>, ItemProps> {}

export const RatingGroupItem = defineComponent<RatingGroupItemProps>(
  (props, { slots, attrs }) => {
    const api = useRatingGroupContext()
    RatingGroupItemProvider(computed(() => props))

    return () => (
      <ark.span {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
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
