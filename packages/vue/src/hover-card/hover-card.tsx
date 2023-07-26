import { type Context as HoverCardContext } from '@zag-js/hover-card'
import { defineComponent, type PropType } from 'vue'

import type { Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { HoverCardProvider } from './hover-card-context'
import { useHoverCard } from './use-hover-card'

export type UseHoverCardProps = HoverCardContext

const VueHoverCardProps = createVueProps<UseHoverCardProps>({
  id: {
    type: String as PropType<UseHoverCardProps['id']>,
  },
  ids: {
    type: Object as PropType<UseHoverCardProps['ids']>,
  },
  openDelay: {
    type: Number as PropType<UseHoverCardProps['openDelay']>,
  },
  closeDelay: {
    type: Number as PropType<UseHoverCardProps['closeDelay']>,
  },
  dir: {
    type: String as PropType<UseHoverCardProps['dir']>,
  },
  getRootNode: {
    type: Function as PropType<UseHoverCardProps['getRootNode']>,
  },
  open: {
    type: Boolean as PropType<UseHoverCardProps['open']>,
  },
  positioning: {
    type: Object as PropType<UseHoverCardProps['positioning']>,
  },
})

export const HoverCard: ComponentWithProps<Partial<UseHoverCardProps>> = defineComponent({
  name: 'HoverCard',
  props: VueHoverCardProps,
  emits: ['open', 'close'],
  setup(props, { slots, emit }) {
    const api = useHoverCard(emit, props as HoverCardProps)

    HoverCardProvider(api)

    return () => slots?.default?.(api.value)
  },
})

export type HoverCardProps = Optional<UseHoverCardProps, 'id'>
