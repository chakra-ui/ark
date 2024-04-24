import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseTooltipContext, useTooltipContext } from './use-tooltip-context'

export type TooltipContextProps = SlotsType<{
  default: UnwrapRef<UseTooltipContext>
}>

export const TooltipContext = defineComponent(
  (_, { slots }) => {
    const tooltip = useTooltipContext()

    return () => slots.default(tooltip.value)
  },
  {
    name: 'TooltipContext',
    slots: Object as TooltipContextProps,
  },
)
