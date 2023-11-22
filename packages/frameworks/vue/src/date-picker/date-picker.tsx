import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { DatePickerProvider } from './date-picker-context'
import { emits, props } from './date-picker.props'
import { useDatePicker, type UseDatePickerProps } from './use-date-picker'

export interface DatePickerProps extends Assign<HTMLArkProps<'div'>, UseDatePickerProps> {}
// UsePresenceProps {}

export const DatePicker = defineComponent({
  name: 'DatePicker',
  props,
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useDatePicker(props, emit)
    DatePickerProvider(api)

    return () => (
      // <Presence {...props} present={props.present !== undefined ? props.present : api.value.isOpen}>
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
      // </Presence>
    )
  },
})
