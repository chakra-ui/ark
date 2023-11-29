import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowTipProps = HTMLArkProps<'div'>

export const HoverCardArrowTip = defineComponent({
  name: 'HoverCardArrowTip',
  setup(_, { slots, attrs }) {
    const api = useHoverCardContext()

    return () => (
      <ark.div {...api.value.arrowTipProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
