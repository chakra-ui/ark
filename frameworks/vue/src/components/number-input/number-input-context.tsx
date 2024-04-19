import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseNumberInputContext, useNumberInputContext } from './use-number-input-context'

export type NumberInputContextProps = SlotsType<{
  default: UnwrapRef<UseNumberInputContext>
}>

export const NumberInputContext = defineComponent(
  (_, { slots }) => {
    const numberinput = useNumberInputContext()

    return () => slots.default(numberinput.value)
  },
  {
    name: 'NumberInputContext',
    slots: Object as NumberInputContextProps,
  },
)
