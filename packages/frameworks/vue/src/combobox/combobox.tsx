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
    ...props,
    items: {
      type: Array as PropType<UseComboboxProps<any>['items']>,
      required: true,
    },
    itemToString: {
      type: Function as PropType<UseComboboxProps<any>['itemToString']>,
    },
    itemToValue: {
      type: Function as PropType<UseComboboxProps<any>['itemToValue']>,
    },
    isItemDisabled: {
      type: Function as PropType<UseComboboxProps<any>['isItemDisabled']>,
    },
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
  },
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useCombobox(props, emit)

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps as any, emit)

    ComboboxProvider(api)
    PresenceProvider(presenceApi)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
})
