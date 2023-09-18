import { defineComponent, h } from 'vue'
import type { HTMLArkProps } from '../factory'
import { useUniqueChild } from '../utils'
import { useDialogContext } from './dialog-context'

export type DialogTriggerProps = HTMLArkProps<'button'>

export const DialogTrigger = defineComponent({
  name: 'DialogTrigger',
  setup(_, { slots, attrs }) {
    const api = useDialogContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'DialogTrigger')

      return h(DefaultSlot, { ...api.value.triggerProps, ...attrs })
    }
  },
})
