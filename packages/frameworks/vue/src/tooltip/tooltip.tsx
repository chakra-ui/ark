import { defineComponent } from 'vue'
import { TooltipProvider } from './tooltip-context'
import { emits, props } from './tooltip.props'
import { useTooltip, type UseTooltipProps } from './use-tooltip'

export type TooltipProps = UseTooltipProps

export const Tooltip = defineComponent({
  name: 'Tooltip',
  props,
  emits,
  setup(props, { slots, emit }) {
    const api = useTooltip(props, emit)
    TooltipProvider(api)

    return () => slots.default?.(api.value)
  },
})
