import { type PropType, computed, defineComponent } from 'vue'
import type { Assign, CollectionItem } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, usePresence } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { emits, props } from './combobox.props'
import { type UseComboboxProps, useCombobox } from './use-combobox'
import { ComboboxProvider } from './use-combobox-context'

// TOOD: #2011 this is a bad workaround but should work for now
// function signature doesn't really support more complicated generics
export interface ComboboxRootProps<T extends CollectionItem>
  extends Assign<HTMLArkProps<'div'>, UseComboboxProps<T>>,
    UsePresenceProps {}

export const ComboboxRoot = defineComponent<ComboboxRootProps<CollectionItem>>(
  (props, { slots, attrs, emit }) => {
    const api = useCombobox(props, emit)

    const isOpen = computed(() => api.value.open)

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
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ComboboxRoot',
    props: {
      ...props,
      ...presenceProps,
      items: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        type: Array as PropType<UseComboboxProps<any>['items']>,
        required: true,
      },
      itemToString: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        type: Function as PropType<UseComboboxProps<any>['itemToString']>,
      },
      itemToValue: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        type: Function as PropType<UseComboboxProps<any>['itemToValue']>,
      },
      isItemDisabled: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        type: Function as PropType<UseComboboxProps<any>['isItemDisabled']>,
      },
    },
    emits: [...emits, ...presenceEmits],
  },
)
