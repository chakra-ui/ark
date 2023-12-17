import type { ItemProps } from '@zag-js/menu'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { type ComponentWithProps } from '../utils'
import { useMenuContext } from './menu-context'

export interface MenuItemProps extends Assign<HTMLArkProps<'button'>, ItemProps> {}

export const MenuItem: ComponentWithProps<MenuItemProps> = defineComponent({
  name: 'MenuItem',
  props: {
    id: {
      type: String as PropType<MenuItemProps['id']>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<MenuItemProps['disabled']>,
    },
    valueText: {
      type: String as PropType<MenuItemProps['valueText']>,
    },
    closeOnSelect: {
      type: Boolean as PropType<MenuItemProps['closeOnSelect']>,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
