import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerNextTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerNextTrigger = defineComponent<DatePickerNextTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const viewProps = useDatePickerViewPropsContext()

    return () => (
      <ark.button {...api.value.getNextTriggerProps(viewProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DatePickerNextTrigger',
  },
)
