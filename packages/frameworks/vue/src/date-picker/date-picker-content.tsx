import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerContentProps extends HTMLArkProps<'div'> {}

export const DatePickerContent = defineComponent<DatePickerContentProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()

    // if (presenceApi.isUnmounted) {
    //   return null
    // }

    return () => (
      <ark.div {...api.value.contentProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'DatePickerContent',
  },
)
