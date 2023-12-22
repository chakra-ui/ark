import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign, CollectionItem } from '../types'
import { SelectProvider } from './select-context'
import { emits, props } from './select.props'
import { useSelect, type UseSelectProps } from './use-select'

export interface SelectProps<T extends CollectionItem>
  extends Assign<HTMLArkProps<'div'>, UseSelectProps<T>> {}

export const Select = defineComponent({
  name: 'Select',
  props: {
    ...props,
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
