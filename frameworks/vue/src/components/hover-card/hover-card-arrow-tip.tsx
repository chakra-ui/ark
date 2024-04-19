import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardArrowTipProps extends HTMLArkProps<'div'> {}

export const HoverCardArrowTip = defineComponent<HoverCardArrowTipProps>(
  (_, { slots, attrs }) => {
    const hoverCard = useHoverCardContext()

    return () => (
      <ark.div {...hoverCard.value.arrowTipProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'HoverCardArrowTip',
  },
)
