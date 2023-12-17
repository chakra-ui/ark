import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type UsePresenceProps } from '../presence'
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
  },
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useCombobox(props, emit)
    ComboboxProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
})
