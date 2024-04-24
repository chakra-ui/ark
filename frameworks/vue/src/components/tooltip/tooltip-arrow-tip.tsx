import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipArrowTipProps extends HTMLArkProps<'div'> {}

export const TooltipArrowTip = defineComponent<TooltipArrowTipProps>(
  (_, { slots, attrs }) => {
    const api = useTooltipContext()

    return () => (
      <ark.div {...api.value.arrowTipProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TooltipArrowTip',
  },
)
