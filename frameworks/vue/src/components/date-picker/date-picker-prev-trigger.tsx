import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerPrevTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerPrevTrigger = defineComponent<DatePickerPrevTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const view = useDatePickerViewContext()

    return () => (
      <ark.button {...api.value.getPrevTriggerProps(view)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DatePickerPrevTrigger',
  },
)
