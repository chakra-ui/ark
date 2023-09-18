import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowProps = HTMLArkProps<'div'>

export const HoverCardArrow = defineComponent({
  name: 'HoverCardArrow',
  setup(_, { slots, attrs }) {
    const api = useHoverCardContext()

    return () => (
      <ark.div {...api.value.arrowProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
