import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerContentProps extends HTMLArkProps<'div'> {}

export const DatePickerContent = defineComponent<DatePickerContentProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const presenceApi = usePresenceContext()

    return () =>
      presenceApi.value.isUnmounted ? null : (
        <ark.div {...api.value.contentProps} {...presenceApi.value.presenceProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'DatePickerContent',
  },
)
