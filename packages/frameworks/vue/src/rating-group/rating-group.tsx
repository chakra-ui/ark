import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RatingGroupProvider } from './rating-group-context'
import { emits, props } from './rating-group.props'
import { useRatingGroup, type UseRatingGroupProps } from './use-rating-group'

export interface RatingGroupProps extends Assign<HTMLArkProps<'div'>, UseRatingGroupProps> {}

export const RatingGroup = defineComponent({
  name: 'RatingGroup',
  props,
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useRatingGroup(props, emit)
    RatingGroupProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
})
