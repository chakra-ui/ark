import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useMenuContext } from './menu-context'

export type MenuItemGroupLabelProps = Assign<HTMLArkProps<'div'>, { htmlFor: string }>

export const MenuItemGroupLabel: ComponentWithProps<MenuItemGroupLabelProps> = defineComponent({
  name: 'MenuItemGroupLabel',
  props: {
    htmlFor: {
      type: String as PropType<MenuItemGroupLabelProps['htmlFor']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.getItemGroupLabelProps(props)} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
