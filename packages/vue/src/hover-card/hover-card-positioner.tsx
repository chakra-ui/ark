import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardPositionerProps = HTMLArkProps<'div'>

export const HoverCardPositioner: ComponentWithProps<HoverCardPositionerProps> = defineComponent({
  name: 'HoverCardPositioner',
  setup(_, { slots, attrs }) {
    const api = useHoverCardContext()

    return () => (
      <ark.div {...api.value.positionerProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
