import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

// TODO: remove after zag is updated
interface InputProps {
  index?: number
}

export interface DatePickerInputProps extends Assign<HTMLArkProps<'input'>, InputProps> {}

export const DatePickerInput = defineComponent<DatePickerInputProps>(
  (props, { attrs }) => {
    const api = useDatePickerContext()

    return () => <ark.input {...api.value.getInputProps(props)} {...attrs} />
  },
  {
    name: 'DatePickerInput',
    props: {
      index: {
        type: Number as PropType<InputProps['index']>,
      },
    },
  },
)
