import { defineComponent } from 'vue'
import { TooltipProvider } from './tooltip-context'
import { emits, props } from './tooltip.props'
import { useTooltip, type UseTooltipProps } from './use-tooltip'

export interface TooltipProps extends UseTooltipProps {}

export const Tooltip = defineComponent<TooltipProps>(
  (props, { slots, emit }) => {
    const api = useTooltip(props, emit)
    TooltipProvider(api)

    return () => slots.default?.(api.value)
  },
  {
    name: 'Tooltip',
    props,
    emits,
  },
)
