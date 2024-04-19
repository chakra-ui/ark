import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

export interface DatePickerViewTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerViewTrigger = defineComponent<DatePickerViewTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const view = useDatePickerViewContext()

    return () => (
      <ark.button {...api.value.getViewTriggerProps(view)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DatePickerViewTrigger',
  },
)
