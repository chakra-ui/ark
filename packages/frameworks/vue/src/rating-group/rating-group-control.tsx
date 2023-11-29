import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useRatingGroupContext } from './rating-group-context'

export interface RatingGroupControlProps extends HTMLArkProps<'div'> {}

export const RatingGroupControl = defineComponent({
  name: 'RatingGroupControl',
  setup(_, { slots, attrs }) {
    const api = useRatingGroupContext()

    return () => (
      <>
        <ark.div {...api.value.controlProps} {...attrs}>
          {slots.default?.(api.value)}
        </ark.div>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
})
