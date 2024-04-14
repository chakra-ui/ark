import type { ItemGroupProps } from '@zag-js/menu'
import { type PropType, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { useMenuContext } from './menu-context'

export interface MenuItemGroupProps extends Assign<HTMLArkProps<'div'>, ItemGroupProps> {}

export const MenuItemGroup = defineComponent<MenuItemGroupProps>(
  (props, { slots, attrs }) => {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.getItemGroupProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuItemGroup',
    props: {
      id: {
        type: String as PropType<MenuItemGroupProps['id']>,
        required: true,
      },
    },
  },
)
