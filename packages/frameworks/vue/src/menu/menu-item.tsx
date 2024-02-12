import type { ItemProps } from '@zag-js/menu'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './menu-context'

export interface MenuItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const MenuItem = defineComponent<MenuItemProps>(
  (props, { slots, attrs }) => {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuItem',
    props: {
      id: {
        type: String as PropType<MenuItemProps['id']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<MenuItemProps['disabled']>,
        default: undefined,
      },
      valueText: {
        type: String as PropType<MenuItemProps['valueText']>,
        default: undefined,
      },
      closeOnSelect: {
        type: Boolean as PropType<MenuItemProps['closeOnSelect']>,
        default: undefined,
      },
    },
  },
)
