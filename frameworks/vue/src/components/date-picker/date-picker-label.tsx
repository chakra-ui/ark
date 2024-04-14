import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerLabelProps extends HTMLArkProps<'label'> {}

export const DatePickerLabel = defineComponent<DatePickerLabelProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'DatePickerLabel',
  },
)
