import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import type { Assign, CollectionItem } from '../types'
import { SelectProvider } from './select-context'
import { emits, props } from './select.props'
import { useSelect, type UseSelectProps } from './use-select'

export interface SelectProps<T extends CollectionItem>
  extends Assign<HTMLArkProps<'div'>, UseSelectProps<T>>,
    UsePresenceProps {}

// TOOD: #2011 this is a bad workaround but should work for now
// function signature doesn't really support more complicated generics
export const Select = defineComponent<SelectProps<CollectionItem>>(
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
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'Select',
    props: {
      ...props,
      ...presenceProps,
      items: {
        type: Array as PropType<UseSelectProps<any>['items']>,
        required: true,
      },
      itemToString: {
        type: Function as PropType<UseSelectProps<any>['itemToString']>,
      },
      itemToValue: {
        type: Function as PropType<UseSelectProps<any>['itemToValue']>,
      },
      isItemDisabled: {
        type: Function as PropType<UseSelectProps<any>['isItemDisabled']>,
      },
    },
    emits: {
      ...emits,
      ...presenceEmits,
    },
  },
)
