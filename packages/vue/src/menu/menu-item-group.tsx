import { defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

type MenuItemGroupParams = Parameters<UseMenuReturn['api']['getItemGroupProps']>[0]

export type MenuItemGroupProps = Assign<HTMLArkProps<'div'>, MenuItemGroupParams>

export const MenuItemGroup: ComponentWithProps<MenuItemGroupProps> = defineComponent({
  name: 'MenuItemGroup',
  props: {
    id: {
      type: String as PropType<MenuItemGroupProps['id']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useMenuContext()

    return () => (
      <ark.div
        {...api.value.getItemGroupProps({
          id: props.id,
        })}
        {...attrs}
      >
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
