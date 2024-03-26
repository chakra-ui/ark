import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerContentProps extends HTMLArkProps<'div'> {}

export const DatePickerContent = defineComponent<DatePickerContentProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.contentProps} {...presenceApi.value.presenceProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'DatePickerContent',
  },
)
