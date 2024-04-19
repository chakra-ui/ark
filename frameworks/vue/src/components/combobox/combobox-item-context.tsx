import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseComboboxItemContext, useComboboxItemContext } from './use-combobox-item-context'

export type ComboboxItemContextProps = SlotsType<{
  default: UnwrapRef<UseComboboxItemContext>
}>

export const ComboboxItemContext = defineComponent(
  (_, { slots }) => {
    const item = useComboboxItemContext()

    return () => slots.default(item.value)
  },
  {
    name: 'ComboboxItemContext',
    slots: Object as ComboboxItemContextProps,
  },
)
