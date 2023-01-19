import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useDialogContext } from './dialog-context'

/** This type is here so that the script 'check-exports' passes
 *  because in Vue we don't pass 'children' as props
 */
export type DialogCloseTriggerProps = Record<string, unknown>

export const DialogCloseTrigger = defineComponent<DialogCloseTriggerProps>({
  name: 'DialogCloseTrigger',
  setup(_, { slots, attrs }) {
    const api = useDialogContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'DialogCloseTrigger')

      return h(DefaultSlot, { ...api.value.closeTriggerProps, ...attrs })
    }
  },
})
