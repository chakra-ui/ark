import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useNumberInputContext } from './number-input-context'

export const NumberInputIncrementTrigger = defineComponent({
  name: 'NumberInputIncrementTrigger',
  setup(_, { slots, attrs }) {
    const api = useNumberInputContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'NumberInputIncrementTrigger')

      return h(DefaultSlot, { ...api.value.incrementTriggerProps, ...attrs })
    }
  },
})
