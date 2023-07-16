import { defineComponent, h } from 'vue'
import type { HTMLArkProps } from '../factory'
import { useUniqueChild } from '../utils'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerEyeDropperTriggerProps = HTMLArkProps<'button'>

export const ColorPickerEyeDropperTrigger = defineComponent({
  name: 'ColorPickerEyeDropperTrigger',
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'ColorPickerEyeDropperTrigger')

      return h(DefaultSlot, { ...api.value.eyeDropperTriggerProps, ...attrs })
    }
  },
})
