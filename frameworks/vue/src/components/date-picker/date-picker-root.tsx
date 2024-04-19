import { computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, usePresence } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { DatePickerProvider } from './date-picker-context'
import { emits, props } from './date-picker.props'
import { type UseDatePickerProps, useDatePicker } from './use-date-picker'

export interface DatePickerRootProps
  extends Assign<HTMLArkProps<'div'>, UseDatePickerProps>,
    UsePresenceProps {}

export const DatePickerRoot = defineComponent<DatePickerRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useDatePicker(props, emit)

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps, emit)

    DatePickerProvider(api)
    PresenceProvider(presenceApi)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'DatePickerRoot',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: [...emits, ...presenceEmits],
  },
)
