import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerControlProps extends HTMLArkProps<'div'> {}

export const DatePickerControl = defineComponent({
  name: 'DatePickerControl',
  setup(_, { attrs, slots }) {
    const api = useDatePickerContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
