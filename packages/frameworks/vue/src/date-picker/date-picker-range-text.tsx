import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerRangeTextProps extends HTMLArkProps<'div'> {}

export const DatePickerRangeText = defineComponent({
  name: 'DatePickerRangeText',
  setup(_, { attrs }) {
    const api = useDatePickerContext()

    return () => (
      <ark.div {...api.value.rangeTextProps} {...attrs}>
        {api.value.visibleRangeText.start}
      </ark.div>
    )
  },
})
