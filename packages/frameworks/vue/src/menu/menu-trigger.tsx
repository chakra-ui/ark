import { defineComponent, h } from 'vue'
import type { HTMLArkProps } from '../factory'
import { useUniqueChild } from '../utils'
import { useMenuContext } from './menu-context'

export type MenuTriggerProps = HTMLArkProps<'button'>

export const MenuTrigger = defineComponent({
  name: 'MenuTrigger',
  setup(_, { slots, attrs }) {
    const api = useMenuContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'MenuTrigger')

      return h(DefaultSlot, { ...api.value.triggerProps, ...attrs })
    }
  },
})
