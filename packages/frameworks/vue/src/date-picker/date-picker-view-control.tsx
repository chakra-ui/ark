import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerViewControlProps extends HTMLArkProps<'div'> {}

export const DatePickerViewControl = defineComponent<DatePickerViewControlProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const view = useDatePickerViewContext()

    return () => (
      <ark.div {...api.value.getViewControlProps(view)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'DatePickerViewControl',
  },
)
