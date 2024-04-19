import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UsePinInputContext, usePinInputContext } from './use-pin-input-context'

export type PinInputContextProps = SlotsType<{
  default: UnwrapRef<UsePinInputContext>
}>

export const PinInputContext = defineComponent(
  (_, { slots }) => {
    const pininput = usePinInputContext()

    return () => slots.default(pininput.value)
  },
  {
    name: 'PinInputContext',
    slots: Object as PinInputContextProps,
  },
)
