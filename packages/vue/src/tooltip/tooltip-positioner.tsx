import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useTooltipContext } from './tooltip-context'

export type TooltipPositionerProps = HTMLArkProps<'div'>

export const TooltipPositioner: ComponentWithProps<TooltipPositionerProps> = defineComponent({
  name: 'TooltipPositioner',
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()

    return () =>
      api.value.isOpen ? (
        <ark.div {...api.value.positionerProps} {...attrs}>
          {() => getValidChildren(slots)}
        </ark.div>
      ) : null
  },
})
