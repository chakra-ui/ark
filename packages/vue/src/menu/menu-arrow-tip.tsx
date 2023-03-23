import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useMenuContext } from './menu-context'

export type MenuArrowTipProps = HTMLArkProps<'div'>

export const MenuArrowTip: ComponentWithProps<MenuArrowTipProps> = defineComponent({
  name: 'MenuArrowTip',
  setup(_, { slots, attrs }) {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.arrowTipProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
