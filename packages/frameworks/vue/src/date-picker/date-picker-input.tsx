import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerInputProps extends HTMLArkProps<'input'> {}

export const DatePickerInput = defineComponent({
  name: 'DatePickerInput',
  setup(_, { attrs }) {
    const api = useDatePickerContext()

    return () => <ark.input {...api.value.inputProps} {...attrs} />
  },
})
