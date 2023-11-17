import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerEyeDropperTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerEyeDropperTrigger = defineComponent({
  name: 'ColorPickerEyeDropperTrigger',
  setup(_, { slots, attrs }) {
    const api = useColorPickerContext()
    return () => (
      <ark.button {...api.value.eyeDropperTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
