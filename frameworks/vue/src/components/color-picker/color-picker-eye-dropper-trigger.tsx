import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerEyeDropperTriggerProps extends HTMLArkProps<'button'> {}

export const ColorPickerEyeDropperTrigger = defineComponent<ColorPickerEyeDropperTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useColorPickerContext()
    return () => (
      <ark.button {...api.value.eyeDropperTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'ColorPickerEyeDropperTrigger',
  },
)
