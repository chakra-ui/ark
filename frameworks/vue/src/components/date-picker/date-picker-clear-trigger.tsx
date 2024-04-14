import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerClearTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerClearTrigger = defineComponent<DatePickerClearTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()

    return () => (
      <ark.button {...api.value.clearTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DatePickerClearTrigger',
  },
)
