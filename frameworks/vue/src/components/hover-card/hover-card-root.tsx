import { computed, defineComponent } from 'vue'
import { PresenceProvider, type UsePresenceProps, usePresence } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { HoverCardProvider } from './hover-card-context'
import { emits, props } from './hover-card.props'
import { type UseHoverCardProps, useHoverCard } from './use-hover-card'

export interface HoverCardRootProps extends UseHoverCardProps, UsePresenceProps {}

export const HoverCardRoot = defineComponent<HoverCardRootProps>(
  (props, { slots, emit }) => {
    const api = useHoverCard(props, emit)

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps, emit)

    HoverCardProvider(api)
    PresenceProvider(presenceApi)

    return () => slots.default?.(api.value)
  },
  {
    name: 'HoverCardRoot',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: [...emits, ...presenceEmits],
  },
)
