import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useMenuContext } from './menu-context'

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
