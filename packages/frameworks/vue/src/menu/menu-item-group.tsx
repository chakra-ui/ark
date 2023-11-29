import type { GroupProps } from '@zag-js/menu'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { type ComponentWithProps } from '../utils'
import { useMenuContext } from './menu-context'

export type MenuItemGroupProps = Assign<HTMLArkProps<'div'>, GroupProps>

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
        {slots.default?.()}
      </ark.div>
    )
  },
})
