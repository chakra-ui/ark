import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardArrowTipProps extends HTMLArkProps<'div'> {}

export const HoverCardArrowTip = defineComponent<HoverCardArrowTipProps>(
  (_, { slots, attrs }) => {
    const api = useHoverCardContext()

    return () => (
      <ark.div {...api.value.arrowTipProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'HoverCardArrowTip',
  },
)
