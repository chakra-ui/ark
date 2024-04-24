import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseRadioGroupContext, useRadioGroupContext } from './use-radio-group-context'

export type RadioGroupContextProps = SlotsType<{
  default: UnwrapRef<UseRadioGroupContext>
}>

export const RadioGroupContext = defineComponent(
  (_, { slots }) => {
    const radiogroup = useRadioGroupContext()

    return () => slots.default(radiogroup.value)
  },
  {
    name: 'RadioGroupContext',
    slots: Object as RadioGroupContextProps,
  },
)
