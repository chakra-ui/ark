import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import type {} from './use-radio-group-context'
import {
  type UseRadioGroupItemContext,
  useRadioGroupItemContext,
} from './use-radio-group-item-context'

export type RadioGroupItemContextProps = SlotsType<{
  default: UnwrapRef<UseRadioGroupItemContext>
}>

export const RadioGroupItemContext = defineComponent(
  (_, { slots }) => {
    const item = useRadioGroupItemContext()

    return () => slots.default(item.value)
  },
  {
    name: 'RadioGroupItemContext',
    slots: Object as RadioGroupItemContextProps,
  },
)
