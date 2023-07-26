import { defineComponent, h } from 'vue'
import type { HTMLArkProps } from '../factory'
import { useUniqueChild } from '../utils'
import { useMenuContext } from './menu-context'

export type MenuContextTriggerProps = HTMLArkProps<'button'>

export const MenuContextTrigger = defineComponent({
  name: 'MenuContextTrigger',
  setup(_, { slots, attrs }) {
    const api = useMenuContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'MenuContextTrigger')

      return h(DefaultSlot, { ...api.value.contextTriggerProps, ...attrs })
    }
  },
})
