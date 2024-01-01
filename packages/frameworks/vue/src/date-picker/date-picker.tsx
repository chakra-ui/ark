import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { type Assign } from '../types'
import { DatePickerProvider } from './date-picker-context'
import { emits, props } from './date-picker.props'
import { useDatePicker, type UseDatePickerProps } from './use-date-picker'

export interface DatePickerProps
  extends Assign<HTMLArkProps<'div'>, UseDatePickerProps>,
    UsePresenceProps {}

export const DatePicker = defineComponent<DatePickerProps>(
  (props, { slots, attrs, emit }) => {
    const api = useDatePicker(props, emit)

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps as any, emit)

    DatePickerProvider(api)
    PresenceProvider(presenceApi)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'DatePicker',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: {
      ...emits,
      ...presenceEmits,
    },
  },
)
