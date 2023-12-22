import { defineComponent } from 'vue'
import { type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { HoverCardProvider } from './hover-card-context'
import { emits, props } from './hover-card.props'
import { useHoverCard, type UseHoverCardProps } from './use-hover-card'

export interface HoverCardProps extends Assign<HTMLArkProps<'div'>, UseHoverCardProps> {}

export const HoverCard = defineComponent({
  name: 'HoverCard',
  props,
  emits,
  setup(props, { slots, emit }) {
    const api = useHoverCard(props, emit)
    HoverCardProvider(api)

    return () => slots.default?.(api.value)
  },
})
