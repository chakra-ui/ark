import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

interface ItemGroupLabelProps {
  htmlFor: string
}

export interface MenuItemGroupLabelProps extends HTMLArkProps<'div'>, ItemGroupLabelProps {}

export const MenuItemGroupLabel = defineComponent<MenuItemGroupLabelProps>(
  (props, { slots, attrs }) => {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.getItemGroupLabelProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuItemGroupLabel',
    props: {
      htmlFor: {
        type: String as PropType<MenuItemGroupLabelProps['htmlFor']>,
        required: true,
      },
    },
  },
)
