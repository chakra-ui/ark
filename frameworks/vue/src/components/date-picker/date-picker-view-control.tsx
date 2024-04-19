import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerViewControlProps extends HTMLArkProps<'div'> {}

export const DatePickerViewControl = defineComponent<DatePickerViewControlProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const viewProps = useDatePickerViewPropsContext()

    return () => (
      <ark.div {...api.value.getViewControlProps(viewProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'DatePickerViewControl',
  },
)
