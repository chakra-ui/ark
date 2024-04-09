import { computed, defineComponent } from 'vue'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { TooltipProvider } from './tooltip-context'
import { emits, props } from './tooltip.props'
import { useTooltip, type UseTooltipProps } from './use-tooltip'

export interface TooltipRootProps extends UseTooltipProps, UsePresenceProps {}

export const TooltipRoot = defineComponent<TooltipRootProps>(
  (props, { slots, emit }) => {
    const api = useTooltip(props, emit)

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps, emit)

    TooltipProvider(api)
    PresenceProvider(presenceApi)

    return () => slots.default?.(api.value)
  },
  {
    name: 'TooltipRoot',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: [...emits, ...presenceEmits],
  },
)
