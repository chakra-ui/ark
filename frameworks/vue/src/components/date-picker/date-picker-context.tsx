import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseDatePickerContext, useDatePickerContext } from './use-date-picker-context'

export type DatePickerContextProps = SlotsType<{
  default: UnwrapRef<UseDatePickerContext>
}>

export const DatePickerContext = defineComponent(
  (_, { slots }) => {
    const datepicker = useDatePickerContext()

    return () => slots.default(datepicker.value)
  },
  {
    name: 'DatePickerContext',
    slots: Object as DatePickerContextProps,
  },
)
