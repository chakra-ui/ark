import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerTrigger = defineComponent<DatePickerTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DatePickerTrigger',
  },
)
