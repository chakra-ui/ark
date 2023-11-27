import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useRatingGroupContext } from './rating-group-context'

export type RatingGroupControlProps = HTMLArkProps<'div'>

export const RatingGroupControl: ComponentWithProps<RatingGroupControlProps> = defineComponent({
  name: 'RatingGroupControl',
  setup(_, { slots, attrs }) {
    const api = useRatingGroupContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
})
