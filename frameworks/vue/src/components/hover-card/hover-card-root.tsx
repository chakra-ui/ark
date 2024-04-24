import { computed, defineComponent } from 'vue'
import { PresenceProvider, type UsePresenceProps, usePresence } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { emits, props } from './hover-card.props'
import { type UseHoverCardProps, useHoverCard } from './use-hover-card'
import { HoverCardProvider } from './use-hover-card-context'

export interface HoverCardRootProps extends UseHoverCardProps, UsePresenceProps {}

export const HoverCardRoot = defineComponent<HoverCardRootProps>(
  (props, { slots, emit }) => {
    const hoverCard = useHoverCard(props, emit)
    const isOpen = computed(() => hoverCard.value.open)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))

    const presenceApi = usePresence(presenceProps, emit)

    HoverCardProvider(hoverCard)
    PresenceProvider(presenceApi)

    return () => slots.default?.()
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
