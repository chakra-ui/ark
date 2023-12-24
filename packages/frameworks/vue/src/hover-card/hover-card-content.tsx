import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const HoverCardContent = defineComponent<HoverCardContentProps>(
  (props, { slots, attrs }) => {
    const api = useHoverCardContext()

    return () => (
      <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
        <ark.div {...api.value.contentProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      </Presence>
    )
  },
  {
    name: 'HoverCardContent',
    props,
    emits,
  },
)
