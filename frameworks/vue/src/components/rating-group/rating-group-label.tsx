import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useRatingGroupContext } from './rating-group-context'

export interface RatingGroupLabelProps extends HTMLArkProps<'label'> {}

export const RatingGroupLabel = defineComponent<RatingGroupLabelProps>(
  (_, { slots, attrs }) => {
    const api = useRatingGroupContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'RatingGroupLabel',
  },
)
