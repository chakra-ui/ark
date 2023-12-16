import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export interface TooltipArrowTipProps extends HTMLArkProps<'div'> {}

export const TooltipArrowTip = defineComponent({
  name: 'TooltipArrowTip',
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()

    return () => (
      <ark.div {...api.value.arrowTipProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
