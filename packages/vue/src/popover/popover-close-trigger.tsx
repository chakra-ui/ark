import { defineComponent, h } from 'vue'
import type { HTMLArkProps } from '../factory'
import { useUniqueChild } from '../utils'
import { usePopoverContext } from './popover-context'

export type PopoverCloseTriggerProps = HTMLArkProps<'button'>

export const PopoverCloseTrigger = defineComponent({
  name: 'PopoverCloseTrigger',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'PopoverCloseTrigger')

      return h(DefaultSlot, { ...api.value.closeTriggerProps, ...attrs })
    }
  },
})
