import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerViewTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerViewTrigger = defineComponent({
  name: 'DatePickerViewTrigger',
  setup(_, { attrs, slots }) {
    const api = useDatePickerContext()
    const view = useDatePickerViewContext()

    return () => (
      <ark.button {...api.value.getViewTriggerProps(view)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
