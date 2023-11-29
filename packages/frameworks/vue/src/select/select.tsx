import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { SelectProvider } from './select-context'
import { emits, props } from './select.props'
import { useSelect, type UseSelectProps } from './use-select'

export type SelectProps = Assign<HTMLArkProps<'div'>, UseSelectProps>

export const Select = defineComponent({
  name: 'Select',
  props: {
    ...props,
    items: {
      type: Array as PropType<UseSelectProps['items']>,
      required: true,
    },
    itemToString: {
      type: Function as PropType<UseSelectProps['itemToString']>,
    },
    itemToValue: {
      type: Function as PropType<UseSelectProps['itemToValue']>,
    },
    isItemDisabled: {
      type: Function as PropType<UseSelectProps['isItemDisabled']>,
    },
  },
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useSelect(props, emit)
    SelectProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
})
