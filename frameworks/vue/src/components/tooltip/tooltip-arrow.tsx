import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipArrowProps extends HTMLArkProps<'div'> {}

export const TooltipArrow = defineComponent<TooltipArrowProps>(
  (_, { slots, attrs }) => {
    const api = useTooltipContext()

    return () => (
      <ark.div {...api.value.arrowProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TooltipArrow',
  },
)
