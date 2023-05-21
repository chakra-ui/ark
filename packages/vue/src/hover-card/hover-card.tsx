import { defineComponent, type PropType } from 'vue'
import { createVueProps, type ComponentWithProps } from '../utils'
import { HoverCardProvider } from './hover-card-context'
import { useHoverCard, type UseHoverCardProps } from './use-hover-card'

export type HoverCardProps = UseHoverCardProps

const VueHoverCardProps = createVueProps<HoverCardProps>({
  id: {
    type: String as PropType<HoverCardProps['id']>,
  },
  ids: {
    type: Object as PropType<HoverCardProps['ids']>,
  },
  openDelay: {
    type: Number as PropType<HoverCardProps['openDelay']>,
  },
  closeDelay: {
    type: Number as PropType<HoverCardProps['closeDelay']>,
  },
  dir: {
    type: String as PropType<HoverCardProps['dir']>,
  },
  getRootNode: {
    type: Function as PropType<HoverCardProps['getRootNode']>,
  },
  open: {
    type: Boolean as PropType<HoverCardProps['open']>,
  },
  positioning: {
    type: Object as PropType<HoverCardProps['positioning']>,
  },
})

export const HoverCard: ComponentWithProps<HoverCardProps> = defineComponent({
  name: 'HoverCard',
  props: VueHoverCardProps,
  emits: ['open', 'close'],
  setup(props, { slots, emit }) {
    const api = useHoverCard(emit, props as HoverCardProps)

    HoverCardProvider(api)

    return () => slots?.default?.(api.value)
  },
})
