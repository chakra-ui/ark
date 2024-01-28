import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import type { Assign, CollectionItem } from '../types'
import { ComboboxProvider } from './combobox-context'
import { emits, props } from './combobox.props'
import { useCombobox, type UseComboboxProps } from './use-combobox'

// TOOD: #2011 this is a bad workaround but should work for now
// function signature doesn't really support more complicated generics
export interface ComboboxRootProps<T extends CollectionItem>
  extends Assign<HTMLArkProps<'div'>, UseComboboxProps<T>>,
    UsePresenceProps {}

export const ComboboxRoot = defineComponent<ComboboxRootProps<CollectionItem>>(
  (props, { slots, attrs, emit }) => {
    const api = useCombobox(props, emit)

    const isOpen = computed(() => api.value.isOpen)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps, emit)

    ComboboxProvider(api)
    PresenceProvider(presenceApi)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'ComboboxRoot',
    props: {
      ...props,
      ...presenceProps,
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
    },
    emits: {
      ...emits,
      ...presenceEmits,
    },
  },
)
