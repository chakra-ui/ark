import { computed, defineComponent, PropType } from 'vue'
import type { ComponentWithProps } from '../utils'
import { HoverCardProvider } from './hover-card-context'
import { useHoverCard, UseHoverCardProps } from './use-hover-card'

type UseHoverCardPropsContext = UseHoverCardProps['context']

export type HoverCardProps = UseHoverCardPropsContext

const VueHoverCardProps = {
  ids: {
    type: Object as PropType<HoverCardProps['ids']>,
  },
  openDelay: {
    type: Number as PropType<HoverCardProps['openDelay']>,
  },
  closeDelay: {
    type: Number as PropType<HoverCardProps['closeDelay']>,
  },
  defaultOpen: {
    type: Boolean as PropType<HoverCardProps['defaultOpen']>,
  },
  dir: {
    type: String as PropType<HoverCardProps['dir']>,
  },
  getRootNode: {
    type: Function as PropType<HoverCardProps['getRootNode']>,
  },
  positioning: {
    type: Object as PropType<HoverCardProps['positioning']>,
  },
}

export const HoverCard: ComponentWithProps<HoverCardProps> = defineComponent({
  name: 'HoverCard',
  props: VueHoverCardProps,
  emits: ['open-change'],
  setup(props, { slots, emit }) {
    const hoverCardProps = computed<UseHoverCardProps>(() => ({
      context: props,
      emit,
    }))

    const api = useHoverCard(hoverCardProps.value)

    HoverCardProvider(api)

    return () => slots?.default?.()
  },
})
