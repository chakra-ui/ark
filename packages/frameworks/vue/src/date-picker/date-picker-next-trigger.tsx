import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerNextTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerNextTrigger = defineComponent({
  name: 'DatePickerNextTrigger',
  setup(_, { attrs, slots }) {
    const api = useDatePickerContext()
    const view = useDatePickerViewContext()

    return () => (
      <ark.button {...api.value.getNextTriggerProps(view)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
