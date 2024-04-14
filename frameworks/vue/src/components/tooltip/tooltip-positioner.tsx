import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { usePresenceContext } from '../presence'
import { useTooltipContext } from './tooltip-context'

export interface TooltipPositionerProps extends HTMLArkProps<'div'> {}

export const TooltipPositioner = defineComponent<TooltipPositionerProps>(
  (_, { slots, attrs }) => {
    const api = useTooltipContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.positionerProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'TooltipPositioner',
  },
)
