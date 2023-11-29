import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipArrowProps = HTMLArkProps<'div'>

export const TooltipArrow = defineComponent({
  name: 'TooltipArrow',
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()

    return () => (
      <ark.div {...api.value.arrowProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
