import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useMenuContext } from './menu-context'

export type MenuPositionerProps = HTMLArkProps<'div'>

export const MenuPositioner: ComponentWithProps<MenuPositionerProps> = defineComponent({
  name: 'MenuPositioner',
  setup(_, { slots, attrs }) {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.positionerProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
