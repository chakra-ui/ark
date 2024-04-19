import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerPrevTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerPrevTrigger = defineComponent<DatePickerPrevTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const viewProps = useDatePickerViewPropsContext()

    return () => (
      <ark.button {...api.value.getPrevTriggerProps(viewProps)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DatePickerPrevTrigger',
  },
)
