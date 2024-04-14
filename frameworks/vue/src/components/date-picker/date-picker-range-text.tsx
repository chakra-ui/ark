import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerRangeTextProps extends HTMLArkProps<'div'> {}

export const DatePickerRangeText = defineComponent<DatePickerRangeTextProps>(
  (_, { attrs }) => {
    const api = useDatePickerContext()

    return () => (
      <ark.div {...api.value.rangeTextProps} {...attrs}>
        {api.value.visibleRangeText.start}
      </ark.div>
    )
  },
  {
    name: 'DatePickerRangeText',
  },
)
