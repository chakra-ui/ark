import { computed, defineComponent, type PropType } from 'vue'
import { type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import type { Assign } from '../types'
import { HoverCardProvider } from './hover-card-context'
import { emits, props } from './hover-card.props'
import { useHoverCard, type UseHoverCardProps } from './use-hover-card'

export interface HoverCardProps extends Assign<HTMLArkProps<'div'>, UseHoverCardProps> {}

export const HoverCard = defineComponent<HoverCardProps>(
  (props, { slots, emit }) => {
    const api = useHoverCard(props, emit)

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps as any, emit)

    HoverCardProvider(api)
    PresenceProvider(presenceApi)

    return () => slots.default?.(api.value)
  },
  {
    name: 'HoverCard',
    props: {
      ...props,
      present: {
        type: Boolean as PropType<UsePresenceProps['present']>,
        default: undefined,
      },
      lazyMount: {
        type: Boolean as PropType<UsePresenceProps['lazyMount']>,
        default: false,
      },
      unmountOnExit: {
        type: Boolean as PropType<UsePresenceProps['unmountOnExit']>,
        default: false,
      },
    },
    emits,
  },
)
