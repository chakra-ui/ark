import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useNumberInputContext } from './number-input-context'

/** This type is here so that the script 'check-exports' passes
 *  because in Vue we don't pass 'children' as props
 */
export type NumberInputDecrementTriggerProps = Record<string, unknown>

export const NumberInputDecrementTrigger = defineComponent<NumberInputDecrementTriggerProps>({
  name: 'NumberInputDecrementTrigger',
  setup(_, { slots, attrs }) {
    const api = useNumberInputContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'NumberInputDecrementTrigger')

      return h(DefaultSlot, { ...api.value.decrementTriggerProps, ...attrs })
    }
  },
})
