import { defineComponent, h } from 'vue'
import type { HTMLArkProps } from '../factory'
import { useUniqueChild } from '../utils'
import { useComboboxContext } from './combobox-context'

export type ComboboxClearTriggerProps = HTMLArkProps<'button'>

export const ComboboxClearTrigger = defineComponent({
  setup(_, { slots, attrs }) {
    const api = useComboboxContext()

    return () => {
      const DefaultSlot = useUniqueChild(slots, 'ComboboxClearTrigger')

      return h(DefaultSlot, { ...api.value.clearTriggerProps, ...attrs })
    }
  },
})
