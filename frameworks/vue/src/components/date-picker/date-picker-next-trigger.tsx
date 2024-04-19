import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

export interface DatePickerNextTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerNextTrigger = defineComponent<DatePickerNextTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const view = useDatePickerViewContext()

    return () => (
      <ark.button {...api.value.getNextTriggerProps(view)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DatePickerNextTrigger',
  },
)
