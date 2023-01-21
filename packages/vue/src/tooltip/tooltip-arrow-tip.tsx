import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useTooltipContext } from './tooltip-context'

export type TooltipArrowTipProps = HTMLArkProps<'div'>

export const TooltipArrowTip: ComponentWithProps<TooltipArrowTipProps> = defineComponent({
  name: 'TooltipArrowTip',
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()

    return () => (
      <ark.div {...api.value.arrowTipProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
