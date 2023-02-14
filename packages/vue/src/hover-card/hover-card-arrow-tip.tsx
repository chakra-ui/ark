import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowTipProps = HTMLArkProps<'div'>

export const HoverCardArrowTip: ComponentWithProps<HoverCardArrowTipProps> = defineComponent({
  name: 'HoverCardArrowTip',
  setup(_, { slots, attrs }) {
    const api = useHoverCardContext()

    return () => (
      <ark.div {...api.value.arrowTipProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
