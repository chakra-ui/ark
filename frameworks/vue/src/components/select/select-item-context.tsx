import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseSelectItemContext, useSelectItemContext } from './use-select-item-context'

export type SelectItemContextProps = SlotsType<{
  default: UnwrapRef<UseSelectItemContext>
}>

export const SelectItemContext = defineComponent(
  (_, { slots }) => {
    const item = useSelectItemContext()

    return () => slots.default(item)
  },
  {
    name: 'SelectItemContext',
    slots: Object as SelectItemContextProps,
  },
)
