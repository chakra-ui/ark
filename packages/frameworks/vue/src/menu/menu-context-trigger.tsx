import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export interface MenuContextTriggerProps extends HTMLArkProps<'button'> {}

export const MenuContextTrigger = defineComponent({
  name: 'MenuContextTrigger',
  setup(_, { slots, attrs }) {
    const api = useMenuContext()
    return () => {
      return (
        <ark.button {...api.value.contextTriggerProps} {...attrs}>
          {slots.default?.()}
        </ark.button>
      )
    }
  },
})
