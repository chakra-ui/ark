import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerViewTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerViewTrigger = defineComponent<DatePickerViewTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const viewProps = useDatePickerViewPropsContext()

    return () => (
      <ark.button {...api.value.getViewTriggerProps(viewProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DatePickerViewTrigger',
  },
)
