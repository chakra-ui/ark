import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useSelectContext } from './select-context'

/** This type is here so that the script 'check-exports' passes
 *  because in Vue we don't pass 'children' as props
 */
export type SelectTriggerProps = Record<string, unknown>

export const SelectTrigger = defineComponent<SelectTriggerProps>({
  name: 'SelectTrigger',
  setup(_, { slots, attrs }) {
    const api = useSelectContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'SelectTrigger')

      return h(DefaultSlot, { ...api.value.triggerProps, ...attrs })
    }
  },
})
