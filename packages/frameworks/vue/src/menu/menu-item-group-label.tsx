import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useMenuContext } from './menu-context'

interface ItemGroupLabelProps {
  htmlFor: string
}

export interface MenuItemGroupLabelProps extends HTMLArkProps<'div'>, ItemGroupLabelProps {}

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
        {slots.default?.()}
      </ark.div>
    )
  },
})
