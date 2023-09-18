import { defineComponent, h } from 'vue'
import type { HTMLArkProps } from '../factory'
import { useUniqueChild } from '../utils'
import { useToastItemContext } from './toast-item-context'

export type ToastCloseTriggerProps = HTMLArkProps<'button'>

export const ToastCloseTrigger = defineComponent({
  name: 'ToastCloseTrigger',
  setup(_, { slots, attrs }) {
    const api = useToastItemContext()

    return () => {
      const DefaultSlot = useUniqueChild(slots, 'DialogTrigger')

      return h(DefaultSlot, { ...api.value.closeTriggerProps, ...attrs })
    }
  },
})
