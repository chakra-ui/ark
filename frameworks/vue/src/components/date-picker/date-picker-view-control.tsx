import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

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
