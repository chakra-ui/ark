import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export interface MenuTriggerProps extends HTMLArkProps<'button'> {}

export const MenuTrigger = defineComponent({
  name: 'MenuTrigger',
  setup(_, { slots, attrs }) {
    const api = useMenuContext()
    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
