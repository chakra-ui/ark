import { computed, defineComponent } from 'vue'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { PopoverProvider } from './popover-context'
import { emits, props } from './popover.props'
import { usePopover, type UsePopoverProps } from './use-popover'

export interface PopoverProps extends UsePopoverProps, UsePresenceProps {}

export const Popover = defineComponent<PopoverProps>(
  (props, { slots, emit }) => {
    const api = usePopover(props, emit)

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps as any, emit)

    PopoverProvider(api)
    PresenceProvider(presenceApi)

    return () => slots.default?.(api.value)
  },
  {
    name: 'Popover',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: {
      ...emits,
      ...presenceEmits,
    },
  },
)
