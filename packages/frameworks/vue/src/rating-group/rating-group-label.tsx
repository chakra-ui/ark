import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useRatingGroupContext } from './rating-group-context'

export type RatingGroupLabelProps = HTMLArkProps<'label'>

export const RatingGroupLabel: ComponentWithProps<RatingGroupLabelProps> = defineComponent({
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
