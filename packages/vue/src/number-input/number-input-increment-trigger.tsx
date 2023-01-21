import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useNumberInputContext } from './number-input-context'

/** This type is here so that the script 'check-exports' passes
 *  because in Vue we don't pass 'children' as props
 */
export type NumberInputIncrementTriggerProps = Record<string, unknown>

export const NumberInputIncrementTrigger = defineComponent<NumberInputIncrementTriggerProps>({
  name: 'NumberInputIncrementTrigger',
  setup(_, { slots, attrs }) {
    const api = useNumberInputContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'NumberInputIncrementTrigger')

      return h(DefaultSlot, { ...api.value.incrementTriggerProps, ...attrs })
    }
  },
})
