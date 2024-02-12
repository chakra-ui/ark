import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext, type PresenceProps } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useTooltipContext } from './tooltip-context'

export interface TooltipContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const TooltipContent = defineComponent<TooltipContentProps>(
  (props, { slots, attrs }) => {
    const api = useTooltipContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.contentProps} {...attrs}>
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
