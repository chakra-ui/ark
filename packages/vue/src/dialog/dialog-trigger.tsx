import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useDialogContext } from './dialog-context'

/** This type is here so that the script 'check-exports' passes
 *  because in Vue we don't pass 'children' as props
 */
export type DialogTriggerProps = Record<string, unknown>

export const DialogTrigger = defineComponent<DialogTriggerProps>({
  name: 'DialogTrigger',
  setup(_, { slots, attrs }) {
    const api = useDialogContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'DialogTrigger')

      return h(DefaultSlot, { ...api.value.triggerProps, ...attrs })
    }
  },
})
