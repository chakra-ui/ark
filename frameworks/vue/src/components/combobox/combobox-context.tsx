import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseComboboxContext, useComboboxContext } from './use-combobox-context'

export type ComboboxContextProps = SlotsType<{
  default: UnwrapRef<UseComboboxContext>
}>

export const ComboboxContext = defineComponent(
  (_, { slots }) => {
    const combobox = useComboboxContext()

    return () => slots.default(combobox.value)
  },
  {
    name: 'ComboboxContext',
    slots: Object as ComboboxContextProps,
  },
)
