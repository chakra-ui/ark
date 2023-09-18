import { defineComponent, h } from 'vue'
import type { HTMLArkProps } from '../factory'
import { useUniqueChild } from '../utils'
import { usePopoverContext } from './popover-context'

export type PopoverTriggerProps = HTMLArkProps<'button'>

export const PopoverTrigger = defineComponent({
  name: 'PopoverTrigger',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'PopoverTrigger')

      return h(DefaultSlot, { ...api.value.triggerProps, ...attrs })
    }
  },
})
