import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseCheckboxContext, useCheckboxContext } from './use-checkbox-context'

export type CheckboxContextProps = SlotsType<{
  default: UnwrapRef<UseCheckboxContext>
}>

export const CheckboxContext = defineComponent(
  (_, { slots }) => {
    const checkbox = useCheckboxContext()

    return () => slots.default(checkbox.value)
  },
  {
    name: 'CheckboxContext',
    slots: Object as CheckboxContextProps,
  },
)
