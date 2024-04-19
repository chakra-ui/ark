import { type PropType, computed, defineComponent } from 'vue'
import type { Assign, CollectionItem } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, usePresence } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { emits, props } from './select.props'
import { type UseSelectProps, useSelect } from './use-select'
import { SelectProvider } from './use-select-context'

export interface SelectRootProps<T extends CollectionItem>
  extends Assign<HTMLArkProps<'div'>, UseSelectProps<T>>,
    UsePresenceProps {}

// TOOD: #2011 this is a bad workaround but should work for now
// function signature doesn't really support more complicated generics
export const SelectRoot = defineComponent<SelectRootProps<CollectionItem>>(
  (props, { slots, attrs, emit }) => {
    const api = useSelect(props, emit)

    const presenceProps = computed(() => ({
      present: props.present || api.value.isOpen,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps, emit)
    SelectProvider(api)
    PresenceProvider(presenceApi)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SelectRoot',
    props: {
      ...props,
      ...presenceProps,
      items: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        type: Array as PropType<UseSelectProps<any>['items']>,
        required: true,
      },
      itemToString: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        type: Function as PropType<UseSelectProps<any>['itemToString']>,
      },
      itemToValue: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        type: Function as PropType<UseSelectProps<any>['itemToValue']>,
      },
      isItemDisabled: {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        type: Function as PropType<UseSelectProps<any>['isItemDisabled']>,
      },
    },
    emits: [...emits, ...presenceEmits],
  },
)
