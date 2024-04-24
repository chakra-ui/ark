import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { type PresenceProps, usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const TooltipContent = defineComponent<TooltipContentProps>(
  (_, { slots, attrs }) => {
    const api = useTooltipContext()
    const presenceApi = usePresenceContext()

    return () =>
      presenceApi.value.unmounted ? null : (
        <ark.div {...api.value.contentProps} {...presenceApi.value.presenceProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'TooltipContent',
    props,
    emits,
  },
)
