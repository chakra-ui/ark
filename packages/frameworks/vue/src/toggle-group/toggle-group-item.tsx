import type { ItemProps } from '@zag-js/toggle-group'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useToggleGroupContext } from './toggle-group-context'

export interface ToggleGroupItemProps extends Assign<HTMLArkProps<'button'>, ItemProps> {}

export const ToggleGroupItem = defineComponent({
  name: 'ToggleGroupItem',
  props: {
    value: {
      type: String as PropType<ItemProps['value']>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<ItemProps['disabled']>,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useToggleGroupContext()

    return () => (
      <ark.button {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
