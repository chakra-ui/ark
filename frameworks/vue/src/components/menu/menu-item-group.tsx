import type { ItemGroupProps } from '@zag-js/menu'
import { type PropType, defineComponent } from 'vue'
import type { Assign, Optional } from '../../types'
import { useId } from '../../utils'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemGroupProvider } from './use-menu-item-group-context'

type OptionalItemGroupProps = Optional<ItemGroupProps, 'id'>

export interface MenuItemGroupProps extends Assign<HTMLArkProps<'div'>, OptionalItemGroupProps> {}

export const MenuItemGroup = defineComponent<MenuItemGroupProps>(
  (props, { slots, attrs }) => {
    const api = useMenuContext()
    const id = useId()
    const itemGroupProps = { id: props.id ? props.id : id.value }
    MenuItemGroupProvider(itemGroupProps)

    return () => (
      <ark.div {...api.value.getItemGroupProps(itemGroupProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuItemGroup',
    props: {
      id: {
        type: String as PropType<MenuItemGroupProps['id']>,
      },
    },
  },
)
