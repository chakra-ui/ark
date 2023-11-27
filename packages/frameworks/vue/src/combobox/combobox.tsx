import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ComboboxProvider } from './combobox-context'
import { emits, props } from './combobox.props'
import { useCombobox, type UseComboboxProps } from './use-combobox'

export type ComboboxProps = Assign<HTMLArkProps<'div'>, UseComboboxProps>

export const Combobox = defineComponent({
  name: 'Combobox',
  props: {
    ...props,
    items: {
      type: Array as PropType<UseComboboxProps['items']>,
      required: true,
    },
    itemToString: {
      type: Function as PropType<UseComboboxProps['itemToString']>,
    },
    itemToValue: {
      type: Function as PropType<UseComboboxProps['itemToValue']>,
    },
    isItemDisabled: {
      type: Function as PropType<UseComboboxProps['isItemDisabled']>,
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
