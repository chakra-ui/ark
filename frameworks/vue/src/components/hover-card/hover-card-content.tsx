import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { type PresenceProps, usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const HoverCardContent = defineComponent<HoverCardContentProps>(
  (_, { slots, attrs }) => {
    const api = useHoverCardContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.contentProps} {...presenceApi.value.presenceProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'HoverCardContent',
    props,
    emits,
  },
)
