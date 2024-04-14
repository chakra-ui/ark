import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { type PresenceProps, usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useTooltipContext } from './tooltip-context'

export interface TooltipContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const TooltipContent = defineComponent<TooltipContentProps>(
  (_, { slots, attrs }) => {
    const api = useTooltipContext()
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
    name: 'TooltipContent',
    props,
    emits,
  },
)
