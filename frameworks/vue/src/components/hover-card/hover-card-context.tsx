import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseHoverCardContext, useHoverCardContext } from './use-hover-card-context'

export type HoverCardContextProps = SlotsType<{
  default: UnwrapRef<UseHoverCardContext>
}>

export const HoverCardContext = defineComponent(
  (_, { slots }) => {
    const hovercard = useHoverCardContext()

    return () => slots.default(hovercard.value)
  },
  {
    name: 'HoverCardContext',
    slots: Object as HoverCardContextProps,
  },
)
