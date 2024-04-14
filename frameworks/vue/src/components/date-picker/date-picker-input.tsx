import type { InputProps } from '@zag-js/date-picker'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './date-picker-context'

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
