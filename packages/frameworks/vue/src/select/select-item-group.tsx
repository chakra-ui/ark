import type { ItemGroupProps } from '@zag-js/select'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { type ComponentWithProps } from '../utils'
import { useSelectContext } from './select-context'

export interface SelectItemGroupProps extends Assign<HTMLArkProps<'div'>, ItemGroupProps> {}

export const SelectItemGroup: ComponentWithProps<SelectItemGroupProps> = defineComponent({
  name: 'SelectItemGroup',
  props: {
    id: {
      type: String as PropType<SelectItemGroupProps['id']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useSelectContext()

    return () => (
      <ark.div {...api.value.getItemGroupProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
