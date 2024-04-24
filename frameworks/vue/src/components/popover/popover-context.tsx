import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UsePopoverContext, usePopoverContext } from './use-popover-context'

export type PopoverContextProps = SlotsType<{
  default: UnwrapRef<UsePopoverContext>
}>

export const PopoverContext = defineComponent(
  (_, { slots }) => {
    const popover = usePopoverContext()

    return () => slots.default(popover.value)
  },
  {
    name: 'PopoverContext',
    slots: Object as PopoverContextProps,
  },
)
