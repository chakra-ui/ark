import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useRatingGroupContext } from './rating-group-context'

export interface RatingGroupLabelProps extends HTMLArkProps<'label'> {}

export const RatingGroupLabel = defineComponent({
  name: 'RatingGroupLabel',
  setup(_, { slots, attrs }) {
    const api = useRatingGroupContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
})
