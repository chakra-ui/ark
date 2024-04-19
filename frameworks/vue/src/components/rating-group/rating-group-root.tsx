import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './rating-group.props'
import { type UseRatingGroupProps, useRatingGroup } from './use-rating-group'
import { RatingGroupProvider } from './use-rating-group-context'

export interface RatingGroupRootProps extends Assign<HTMLArkProps<'div'>, UseRatingGroupProps> {}

export const RatingGroupRoot = defineComponent<RatingGroupRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useRatingGroup(props, emit)
    RatingGroupProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'RatingGroupRoot',
    props,
    emits,
  },
)
