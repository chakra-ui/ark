import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import type { Assign, CollectionItem } from '../types'
import { ComboboxProvider } from './combobox-context'
import { emits, props } from './combobox.props'
import { useCombobox, type UseComboboxProps } from './use-combobox'

export interface ComboboxProps<T extends CollectionItem>
  extends Assign<HTMLArkProps<'div'>, UseComboboxProps<T>>,
    UsePresenceProps {}

export const Combobox = defineComponent({
  name: 'Combobox',
  props: {
    present: {
      type: Boolean as PropType<UsePresenceProps['present']>,
      default: undefined,
    },
    lazyMount: {
      type: Boolean as PropType<UsePresenceProps['lazyMount']>,
      default: false,
    },
    unmountOnExit: {
      type: Boolean as PropType<UsePresenceProps['unmountOnExit']>,
      default: false,
    },
    ...props,
    items: {
      type: Array as PropType<UseComboboxProps<T>['items']>,
      required: true,
    },
    itemToString: {
      type: Function as PropType<UseComboboxProps<T>['itemToString']>,
    },
    itemToValue: {
      type: Function as PropType<UseComboboxProps<T>['itemToValue']>,
    },
    isItemDisabled: {
      type: Function as PropType<UseComboboxProps<T>['isItemDisabled']>,
    },
  },
  emits,
  setup(props, { slots, attrs, emit }) {
    const presenceProps = computed(() => ({
      present: props.present,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))

    const api = useCombobox(props, emit)
    const presenceApi = usePresence({ ...presenceProps.value, present: api.value.isOpen }, emit)
    ComboboxProvider(api)
    PresenceProvider(presenceApi)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
})
