import { DefineComponent, defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementTriggerProps = DefineComponent
export const NumberInputDecrementTrigger = defineComponent({
  name: 'NumberInputDecrementTrigger',
  setup(_, { slots, attrs }) {
    const api = useNumberInputContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'NumberInputDecrementTrigger')

      return h(DefaultSlot, { ...api.value.decrementTriggerProps, ...attrs })
    }
  },
})
