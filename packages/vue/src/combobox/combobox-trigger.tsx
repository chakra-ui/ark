import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useComboboxContext } from './combobox-context'

export const ComboboxTrigger = defineComponent({
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    return () => {
      const DefaultSlot = useUniqueChild(slots, 'ComboboxTrigger')

      return h(DefaultSlot, { ...api.value.triggerProps, ...attrs })
    }
  },
})
